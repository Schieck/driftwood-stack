# Code Generation Guide

The Driftwood Stack provides a powerful code generation system that helps you quickly scaffold components, services, and pages across different parts of the project. You can generate code either as blank templates or using AI assistance.

## Command Structure

```bash
make component project=<project-type> level=<component-level> name=<component-name>
```

### Project Types
- `exposed-webapp`: Customer-facing Next.js application
- `internal-webapp`: Admin/Internal React application
- `api-gateway`: Go-based API services
- `ml-service`: Python-based Machine Learning services

### Component Levels
- Frontend (`exposed-webapp`, `internal-webapp`):
  - `atom`: Basic UI components
  - `molecule`: Composite components
  - `organism`: Complex UI sections
  - `template`: Page templates
  - `page`: Full pages
- Backend:
  - `service`: API or ML services
  - `model`: Data models (ML service only)

## Examples

### 1. Frontend Component (Exposed WebApp)

```bash
make component project=exposed-webapp level=atom name=SearchBar
```

When choosing AI Generation and providing the description "A search bar component with autocomplete functionality and recent searches display", it generates:

```typescript
import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  maxRecentSearches?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  maxRecentSearches = 5
}) => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch?.(searchQuery);
    
    // Update recent searches
    const updated = [
      searchQuery,
      ...recentSearches.filter(item => item !== searchQuery)
    ].slice(0, maxRecentSearches);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Searches">
            <ScrollArea className="h-[200px]">
              {recentSearches.map((search, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSearch(search)}
                >
                  {search}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchBar
```

### 2. Internal Dashboard Component

```bash
make component project=internal-webapp level=organism name=AnalyticsDashboard
```

With AI Generation description "A dashboard component displaying key metrics, charts, and recent activity":

```typescript
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart } from "recharts"
import { Activity, Users, DollarSign, TrendingUp } from "lucide-react"

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}% from last month
      </p>
    </CardContent>
  </Card>
)

interface AnalyticsDashboardProps {
  data?: {
    metrics: {
      users: number;
      revenue: number;
      activity: number;
      growth: number;
    };
    chartData: Array<{
      date: string;
      users: number;
      revenue: number;
    }>;
  }
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  const defaultData = {
    metrics: {
      users: 1234,
      revenue: 45678,
      activity: 890,
      growth: 12
    },
    chartData: [
      { date: '2024-01', users: 1000, revenue: 40000 },
      { date: '2024-02', users: 1200, revenue: 45000 },
      // Add more default data as needed
    ]
  }

  const dashboardData = data || defaultData;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={dashboardData.metrics.users.toLocaleString()}
          change={8.2}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Revenue"
          value={`$${dashboardData.metrics.revenue.toLocaleString()}`}
          change={12.5}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Users"
          value={dashboardData.metrics.activity.toLocaleString()}
          change={-2.4}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Growth Rate"
          value={`${dashboardData.metrics.growth}%`}
          change={4.1}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              width={500}
              height={300}
              data={dashboardData.chartData}
            >
              {/* Add chart configuration */}
            </LineChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              width={500}
              height={300}
              data={dashboardData.chartData}
            >
              {/* Add chart configuration */}
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
```

### 3. Go API Service

```bash
make component project=api-gateway level=service name=UserAuthService
```

With AI Generation description "Authentication service handling user login, registration, and token management":

```go
package services

import (
    "context"
    "errors"
    "time"
    "github.com/golang-jwt/jwt/v4"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "golang.org/x/crypto/bcrypt"
)

// UserAuthService handles user authentication operations
type UserAuthService struct {
    db          *mongo.Database
    jwtSecret   []byte
    tokenExpiry time.Duration
}

// NewUserAuthService creates a new instance of UserAuthService
func NewUserAuthService(db *mongo.Database, jwtSecret string) *UserAuthService {
    return &UserAuthService{
        db:          db,
        jwtSecret:   []byte(jwtSecret),
        tokenExpiry: 24 * time.Hour,
    }
}

// LoginRequest represents the login credentials
type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

// RegisterRequest represents user registration data
type RegisterRequest struct {
    Email     string `json:"email" binding:"required,email"`
    Password  string `json:"password" binding:"required,min=6"`
    FirstName string `json:"firstName" binding:"required"`
    LastName  string `json:"lastName" binding:"required"`
}

// AuthResponse represents the authentication response
type AuthResponse struct {
    Token     string `json:"token"`
    ExpiresAt int64  `json:"expiresAt"`
}

// Login authenticates a user and returns a JWT token
func (s *UserAuthService) Login(ctx context.Context, req LoginRequest) (*AuthResponse, error) {
    user := &User{}
    err := s.db.Collection("users").FindOne(ctx, bson.M{"email": req.Email}).Decode(user)
    if err != nil {
        return nil, errors.New("invalid credentials")
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
        return nil, errors.New("invalid credentials")
    }

    token, expiresAt, err := s.generateToken(user.ID)
    if err != nil {
        return nil, err
    }

    return &AuthResponse{
        Token:     token,
        ExpiresAt: expiresAt,
    }, nil
}

// Register creates a new user account
func (s *UserAuthService) Register(ctx context.Context, req RegisterRequest) error {
    // Check if user already exists
    exists, err := s.db.Collection("users").CountDocuments(ctx, bson.M{"email": req.Email})
    if err != nil {
        return err
    }
    if exists > 0 {
        return errors.New("email already registered")
    }

    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }

    // Create user
    user := &User{
        Email:     req.Email,
        Password:  string(hashedPassword),
        FirstName: req.FirstName,
        LastName:  req.LastName,
        CreatedAt: time.Now(),
    }

    _, err = s.db.Collection("users").InsertOne(ctx, user)
    return err
}

// ValidateToken validates a JWT token and returns the user ID
func (s *UserAuthService) ValidateToken(tokenString string) (string, error) {
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, errors.New("unexpected signing method")
        }
        return s.jwtSecret, nil
    })

    if err != nil {
        return "", err
    }

    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        return claims["userId"].(string), nil
    }

    return "", errors.New("invalid token")
}

func (s *UserAuthService) generateToken(userID string) (string, int64, error) {
    expiresAt := time.Now().Add(s.tokenExpiry).Unix()

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "userId": userID,
        "exp":    expiresAt,
    })

    tokenString, err := token.SignedString(s.jwtSecret)
    if err != nil {
        return "", 0, err
    }

    return tokenString, expiresAt, nil
}
```

### 4. Python ML Service

```bash
make component project=ml-service level=service name=TextClassifier
```

With AI Generation description "A text classification service using a pre-trained model to categorize text into predefined categories":

```python
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Dict
from loguru import logger
import numpy as np
from transformers import pipeline
from app.core.dependencies import get_cache
from app.core.config import Settings
from redis import Redis

router = APIRouter()

class TextClassificationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=1000)
    threshold: float = Field(default=0.5, ge=0, le=1.0)

class CategoryPrediction(BaseModel):
    category: str
    confidence: float

class TextClassificationResponse(BaseModel):
    predictions: List[CategoryPrediction]
    processing_time: float

class TextClassifier:
    def __init__(self, cache: Redis):
        self.cache = cache
        self.model = None
        self.categories = [
            "business", "technology", "politics", 
            "entertainment", "sports", "science"
        ]
        
    async def load_model(self):
        """Lazy loading of the model"""
        if self.model is None:
            logger.info("Loading text classification model...")
            self.model = pipeline(
                "text-classification",
                model="distilbert-base-uncased",
                top_k=len(self.categories)
            )
            logger.info("Model loaded successfully")

    async def classify(self, text: str, threshold: float) -> List[CategoryPrediction]:
        """Classify text into categories"""
        # Check cache first
        cache_key = f"text_classification:{hash(text)}"
        cached_result = self.cache.get(cache_key)
        
        if cached_result:
            logger.info("Found cached classification result")
            return cached_result
        
        # Load model if not loaded
        await self.load_model()
        
        # Get model predictions
        try:
            raw_predictions = self.model(text)
            
            # Process predictions
            predictions = [
                CategoryPrediction(
                    category=pred['label'],
                    confidence=float(pred['score'])
                )
                for pred in raw_predictions
                if pred['score'] >= threshold
            ]
            
            # Sort by confidence
            predictions.sort(key=lambda x: x.confidence, reverse=True)
            
            # Cache results
            self.cache.setex(
                cache_key,
                300,  # Cache for 5 minutes
                predictions
            )
            
            return predictions
            
        except Exception as e:
            logger.error