declare namespace App {
  export interface Locals {
    netlify: {
      geo: {
        timezone: string
        city: string
        country: string
        latitude: number
        longitude: number
      }
    }
  }
}
