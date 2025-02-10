package services

import (
	"context"
	"errors"

	"dws-api-gateway/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type FilterService interface {
	GetFilters(ctx context.Context) ([]models.Filter, error)
	UpdateFilter(ctx context.Context, filter models.Filter) (models.Filter, error)
	DeleteFilter(ctx context.Context, id string) error
	UpdateUpdaterConfiguration(ctx context.Context, config models.UpdaterConfig) (models.UpdaterConfig, error)
    GetUpdaterConfiguration(ctx context.Context) (models.UpdaterConfig, error)
}

type filterService struct {
	db      *mongo.Database
	filters *mongo.Collection
}

func NewFilterService(db *mongo.Database) FilterService {
	return &filterService{
		db:      db,
		filters: db.Collection("filter_values"),
	}
}

func (s *filterService) GetFilters(ctx context.Context) ([]models.Filter, error) {
	var filters []models.Filter

	cursor, err := s.filters.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &filters); err != nil {
		return nil, err
	}

	return filters, nil
}

func (s *filterService) UpdateFilter(ctx context.Context, filter models.Filter) (models.Filter, error) {
	objID, err := primitive.ObjectIDFromHex(filter.ID)
	if err != nil {
		return models.Filter{}, err
	}

	update := bson.M{
		"$set": bson.M{
			"filter": filter.Filter,
			"values": filter.Values,
		},
	}

	res, err := s.filters.UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil {
		return models.Filter{}, err
	}
	if res.MatchedCount == 0 {
		return models.Filter{}, errors.New("no filter found with given id")
	}
	return filter, nil
}

func (s *filterService) DeleteFilter(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	res, err := s.filters.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		return err
	}
	if res.DeletedCount == 0 {
		return errors.New("no filter found with given id")
	}
	return nil
}

func (s *filterService) UpdateUpdaterConfiguration(ctx context.Context, config models.UpdaterConfig) (models.UpdaterConfig, error) {
	updaterConfigCollection := s.db.Collection("updater_config")
	filter := bson.M{"_id": "config"}
	update := bson.M{"$set": config}
	opts := options.Update().SetUpsert(true)

	_, err := updaterConfigCollection.UpdateOne(ctx, filter, update, opts)
	if err != nil {
		return models.UpdaterConfig{}, err
	}
	return config, nil
}

func (s *filterService) GetUpdaterConfiguration(ctx context.Context) (models.UpdaterConfig, error) {
	updaterConfigCollection := s.db.Collection("updater_config")
	var config models.UpdaterConfig
	err := updaterConfigCollection.FindOne(ctx, bson.M{"_id": "config"}).Decode(&config)
	if err != nil {
		return models.UpdaterConfig{}, err
	}
	return config, nil
}
