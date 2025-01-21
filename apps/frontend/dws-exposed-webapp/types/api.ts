export interface DriftwoodMetadata {
  type: string
  size: number
  color: string
  texture: string
  location: string
  weather_conditions: string
  coordinates: string
  dominant_species: string
  distance_to_water: number
  time_of_day: string
  temperature: number
  humidity: number
}

export interface DriftwoodItem {
  id: string
  image_path: string
  metadata: DriftwoodMetadata
}

export interface DriftwoodSummary {
  id: string
  image_path: string
  type: string
  location: string
}

export interface SearchResponse {
  results: DriftwoodItem[]
  recommendations: DriftwoodSummary[]
}

export interface HealthResponse {
  db: { message: string }
  ml: { status: string; message: string }
}
