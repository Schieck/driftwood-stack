package models

type Filter struct {
	ID     string   `bson:"_id,omitempty" json:"id"`
	Filter string   `bson:"filter" json:"filter"`
	Values []string `bson:"values" json:"values"`
}

type UpdaterConfig struct {
	Enabled  bool `bson:"enabled" json:"enabled"`
	Interval int  `bson:"interval,omitempty" json:"interval,omitempty"`
}