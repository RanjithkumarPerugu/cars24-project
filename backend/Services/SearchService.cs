using backend.Models;

namespace backend.Services;

public class SearchService
{
    // ==========================================
    // SAMPLE CAR DATA
    // ==========================================

    private readonly List<CarSearchResult> cars =
        new List<CarSearchResult>
        {
            new CarSearchResult
            {
                Id = "1",
                Brand = "Hyundai",
                Model = "Creta",
                Year = 2023,
                Price = 1500000,
                FuelType = "Petrol",
                Mileage = 18,
                Transmission = "Automatic",
                Popularity = 95,
                ListedDate = DateTime.Now.AddDays(-5)
            },

            new CarSearchResult
            {
                Id = "2",
                Brand = "Maruti",
                Model = "Swift",
                Year = 2022,
                Price = 850000,
                FuelType = "Petrol",
                Mileage = 22,
                Transmission = "Manual",
                Popularity = 90,
                ListedDate = DateTime.Now.AddDays(-10)
            },

            new CarSearchResult
            {
                Id = "3",
                Brand = "Honda",
                Model = "City",
                Year = 2024,
                Price = 1400000,
                FuelType = "Petrol",
                Mileage = 17,
                Transmission = "Automatic",
                Popularity = 88,
                ListedDate = DateTime.Now.AddDays(-2)
            },

            new CarSearchResult
            {
                Id = "4",
                Brand = "Mahindra",
                Model = "Thar",
                Year = 2023,
                Price = 1800000,
                FuelType = "Diesel",
                Mileage = 15,
                Transmission = "Manual",
                Popularity = 97,
                ListedDate = DateTime.Now.AddDays(-7)
            },

            new CarSearchResult
            {
                Id = "5",
                Brand = "Kia",
                Model = "Seltos",
                Year = 2024,
                Price = 1700000,
                FuelType = "Diesel",
                Mileage = 18,
                Transmission = "Automatic",
                Popularity = 92,
                ListedDate = DateTime.Now.AddDays(-3)
            }
        };

    // ==========================================
    // SEARCH CARS
    // ==========================================

    public List<CarSearchResult> SearchCars(
        CarSearchRequest request)
    {
        var results = cars
            .Select(car => new CarSearchResult
            {
                Id = car.Id,
                Brand = car.Brand,
                Model = car.Model,
                Year = car.Year,
                Price = car.Price,
                FuelType = car.FuelType,
                Mileage = car.Mileage,
                Transmission = car.Transmission,
                Popularity = car.Popularity,
                ListedDate = car.ListedDate,
                RelevanceScore = CalculateRelevanceScore(
                    car,
                    request
                )
            })
            .ToList();

        // ==========================================
        // FILTER BY QUERY + FUZZY MATCHING
        // ==========================================

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            string query = request.Query.ToLower();

            results = results
                .Where(car =>
                    car.Brand.ToLower().Contains(query) ||
                    car.Model.ToLower().Contains(query) ||
                    IsFuzzyMatch(
                        query,
                        car.Brand.ToLower()
                    ) ||
                    IsFuzzyMatch(
                        query,
                        car.Model.ToLower()
                    )
                )
                .ToList();
        }

        // ==========================================
        // FUEL TYPE FILTER
        // ==========================================

        if (!string.IsNullOrWhiteSpace(request.FuelType))
        {
            results = results
                .Where(car =>
                    car.FuelType.Equals(
                        request.FuelType,
                        StringComparison.OrdinalIgnoreCase
                    )
                )
                .ToList();
        }

        // ==========================================
        // YEAR FILTER
        // ==========================================

        if (request.MinYear.HasValue)
        {
            results = results
                .Where(car =>
                    car.Year >= request.MinYear.Value
                )
                .ToList();
        }

        if (request.MaxYear.HasValue)
        {
            results = results
                .Where(car =>
                    car.Year <= request.MaxYear.Value
                )
                .ToList();
        }

        // ==========================================
        // MILEAGE FILTER
        // ==========================================

        if (request.MinMileage.HasValue)
        {
            results = results
                .Where(car =>
                    car.Mileage >= request.MinMileage.Value
                )
                .ToList();
        }

        if (request.MaxMileage.HasValue)
        {
            results = results
                .Where(car =>
                    car.Mileage <= request.MaxMileage.Value
                )
                .ToList();
        }

        // ==========================================
        // TRANSMISSION FILTER
        // ==========================================

        if (!string.IsNullOrWhiteSpace(request.Transmission))
        {
            results = results
                .Where(car =>
                    car.Transmission.Equals(
                        request.Transmission,
                        StringComparison.OrdinalIgnoreCase
                    )
                )
                .ToList();
        }

        // ==========================================
        // BRAND FILTER
        // ==========================================

        if (!string.IsNullOrWhiteSpace(request.Brand))
        {
            results = results
                .Where(car =>
                    car.Brand.Equals(
                        request.Brand,
                        StringComparison.OrdinalIgnoreCase
                    )
                )
                .ToList();
        }

        // ==========================================
        // SORT BY RELEVANCE SCORE
        // ==========================================

        return results
            .OrderByDescending(
                car => car.RelevanceScore
            )
            .ToList();
    }

    // ==========================================
    // AUTO SUGGESTIONS
    // ==========================================

    public List<string> GetSuggestions(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new List<string>();
        }

        query = query.ToLower();

        return cars
            .Where(car =>
                car.Brand.ToLower().Contains(query) ||
                car.Model.ToLower().Contains(query) ||
                IsFuzzyMatch(
                    query,
                    car.Brand.ToLower()
                ) ||
                IsFuzzyMatch(
                    query,
                    car.Model.ToLower()
                )
            )
            .Select(car =>
                $"{car.Brand} {car.Model}"
            )
            .Distinct()
            .Take(5)
            .ToList();
    }

    // ==========================================
    // RELEVANCE SCORING
    // ==========================================

    private double CalculateRelevanceScore(
        CarSearchResult car,
        CarSearchRequest request)
    {
        double score = 0;

        // Keyword Match Score
        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            string query =
                request.Query.ToLower();

            if (
                car.Brand.ToLower()
                    .Contains(query)
                ||
                car.Model.ToLower()
                    .Contains(query)
            )
            {
                score += 50;
            }
            else if (
                IsFuzzyMatch(
                    query,
                    car.Brand.ToLower()
                )
                ||
                IsFuzzyMatch(
                    query,
                    car.Model.ToLower()
                )
            )
            {
                score += 35;
            }
        }

        // Filter alignment score
        if (!string.IsNullOrWhiteSpace(request.FuelType))
        {
            if (
                car.FuelType.Equals(
                    request.FuelType,
                    StringComparison.OrdinalIgnoreCase
                )
            )
            {
                score += 25;
            }
        }

        // Popularity score
        score += car.Popularity * 0.15;

        // Recency score
        int daysOld =
            (DateTime.Now - car.ListedDate).Days;

        if (daysOld <= 7)
        {
            score += 10;
        }
        else if (daysOld <= 30)
        {
            score += 5;
        }

        return score;
    }

    // ==========================================
    // SIMPLE FUZZY MATCHING
    // ==========================================

    private bool IsFuzzyMatch(
        string query,
        string text)
    {
        if (text.Contains(query))
        {
            return true;
        }

        int distance =
            LevenshteinDistance(
                query,
                text
            );

        return distance <= 3;
    }

    // ==========================================
    // LEVENSHTEIN DISTANCE
    // ==========================================

    private int LevenshteinDistance(
        string source,
        string target)
    {
        int[,] matrix =
            new int[
                source.Length + 1,
                target.Length + 1
            ];

        for (
            int i = 0;
            i <= source.Length;
            i++
        )
        {
            matrix[i, 0] = i;
        }

        for (
            int j = 0;
            j <= target.Length;
            j++
        )
        {
            matrix[0, j] = j;
        }

        for (
            int i = 1;
            i <= source.Length;
            i++
        )
        {
            for (
                int j = 1;
                j <= target.Length;
                j++
            )
            {
                int cost =
                    source[i - 1] == target[j - 1]
                        ? 0
                        : 1;

                matrix[i, j] =
                    Math.Min(
                        Math.Min(
                            matrix[i - 1, j] + 1,
                            matrix[i, j - 1] + 1
                        ),
                        matrix[i - 1, j - 1] + cost
                    );
            }
        }

        return matrix[
            source.Length,
            target.Length
        ];
    }
}