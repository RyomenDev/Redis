# Redis

**Redis (Remote Dictionary Server) is an open-source, in-memory data store primarily used as a database, cache, and message broker. It supports various data structures like strings, lists, sets, sorted sets, hashes, bitmaps, hyperloglogs, and streams.**

## Key Features of Redis:

1. **Blazing Fast Performance –** Since Redis stores data in memory, it provides sub-millisecond latency.
2. **Persistence Options –** Data can be stored on disk using RDB (snapshotting) or AOF (Append-Only File) for durability.
3. **Scalability –** Supports replication, partitioning, and clustering for high availability and scaling.
4. **Atomic Operations –** Transactions and Lua scripting allow executing multiple commands atomically.
5. **Pub/Sub Messaging –** Can be used as a message broker for real-time applications.
6. **Supports Expiry & TTL –** Allows setting time-to-live (TTL) for caching scenarios.
7. **Lightweight & Easy to Use –** Simple commands (like SET, GET, EXPIRE) make Redis very developer-friendly.

## Use Cases of Redis:

- **Caching:** Storing frequently accessed data (e.g., user sessions, API responses).
- **Real-time Analytics:** Leaderboards, counting unique visitors, and tracking events.
- **Session Management:** Storing user sessions for web applications.
- **Message Queue (Pub/Sub):** Used for building real-time chat applications or event-driven systems.
- **Rate Limiting:** Controlling API request rates using counters.

## Tech Stack Integration:

Redis is commonly used with **Node.js, Python, Java, Go, and PHP** and integrates well with **MongoDB, MySQL, PostgreSQL, and Elasticsearch**.

# 🚀
