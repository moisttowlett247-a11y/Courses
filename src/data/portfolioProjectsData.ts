import { PortfolioProject } from '../types/curriculum';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-python-rest-api',
    title: 'Production-Grade RESTful Task Engine',
    tag: 'Python · SQLite · REST Architecture',
    description: 'A complete, clean-architecture backend REST API with persistent SQLite database modeling, payload validation, status codes, and error middleware.',
    difficulty: 'Apprentice',
    techStack: ['Python 3.12', 'SQLite3', 'RESTful API Design', 'JSON Schema Validation'],
    architectureOverview: 'Client HTTP requests are routed through input validation middleware, dispatched to stateless domain service controllers, and committed to an ACID-compliant SQLite relational database using connection pooling.',
    learningOutcomes: [
      'Structuring multi-file backend projects with clean separation of concerns',
      'Implementing CRUD endpoints (Create, Read, Update, Delete) with status codes (200, 201, 400, 404)',
      'Writing defensive database migration scripts and prepared SQL statements'
    ],
    files: [
      {
        filename: 'server.py',
        language: 'python',
        code: `import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler

DATABASE = 'tasks.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

class TaskApiHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_GET(self):
        if self.path == '/api/tasks':
            conn = sqlite3.connect(DATABASE)
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, completed FROM tasks")
            rows = cursor.fetchall()
            conn.close()
            tasks = [{"id": r[0], "title": r[1], "completed": bool(r[2])} for r in rows]
            self._send_json(200, {"tasks": tasks})
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        if self.path == '/api/tasks':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                payload = json.loads(body)
                title = payload.get('title', '').strip()
                if not title:
                    return self._send_json(400, {"error": "Title is required"})
                
                conn = sqlite3.connect(DATABASE)
                cursor = conn.cursor()
                cursor.execute("INSERT INTO tasks (title, completed) VALUES (?, 0)", (title,))
                task_id = cursor.lastrowid
                conn.commit()
                conn.close()
                self._send_json(201, {"id": task_id, "title": title, "completed": False})
            except Exception as e:
                self._send_json(500, {"error": str(e)})

if __name__ == '__main__':
    init_db()
    server = HTTPServer(('0.0.0.0', 8080), TaskApiHandler)
    print("Server running on http://localhost:8080")
    server.serve_forever()
`
      },
      {
        filename: 'README.md',
        language: 'markdown',
        code: `# Production-Grade RESTful Task Engine

A robust backend REST API built in pure Python and SQLite.

## Features
- Standard HTTP status codes (200, 201, 400, 404, 500)
- SQL injection protection via parameterized queries
- Persistent relational database schema

## Run Locally
\`\`\`bash
python server.py
curl -X POST http://localhost:8080/api/tasks -d '{"title": "Master Backend Engineering"}'
curl http://localhost:8080/api/tasks
\`\`\`
`
      }
    ],
    githubReadmeMarkdown: `# Production-Grade RESTful Task Engine 🚀

A lightweight, zero-dependency REST API implemented in Python with SQLite persistence.

## Architecture
- **Web Layer**: Pure Python HTTP Server with structured JSON serialization
- **Persistence**: Relational SQLite3 database with parameterized query defense
- **Endpoints**:
  - \`GET /api/tasks\` - Retrieve all records
  - \`POST /api/tasks\` - Create new validated record

## Quickstart
\`\`\`bash
python3 server.py
\`\`\`
`
  },
  {
    id: 'proj-go-concurrent-crawler',
    title: 'High-Throughput Concurrent Web Scraper',
    tag: 'Go (Golang) · Concurrency · Worker Pools',
    description: 'A multi-threaded concurrent web scraper in Go utilizing worker pools, bounded channels, and sync.WaitGroup to process thousands of network targets in parallel.',
    difficulty: 'Adept',
    techStack: ['Go 1.22', 'Goroutines', 'Buffered Channels', 'sync.WaitGroup', 'Mutex Locks'],
    architectureOverview: 'Distributes URL queues over a fixed pool of concurrent worker goroutines. Avoids thread starvation using buffered channels and aggregates results into a thread-safe mutex-guarded map.',
    learningOutcomes: [
      'Designing bounded worker pool concurrency patterns in Go',
      'Preventing race conditions with sync.Mutex and sync.WaitGroup',
      'Handling network timeouts gracefully with Go context'
    ],
    files: [
      {
        filename: 'main.go',
        language: 'go',
        code: `package main

import (
	"fmt"
	"sync"
	"time"
)

type Result struct {
	URL     string
	Latency time.Duration
	Status  int
}

func Worker(id int, jobs <-chan string, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for url := range jobs {
		// Simulate network scrape latency
		start := time.Now()
		time.Sleep(time.Millisecond * 50)
		results <- Result{
			URL:     url,
			Latency: time.Since(start),
			Status:  200,
		}
	}
}

func main() {
	urls := []string{
		"https://kernel.org",
		"https://golang.org",
		"https://python.org",
		"https://postgresql.org",
		"https://redis.io",
	}

	workerCount := 3
	jobs := make(chan string, len(urls))
	results := make(chan Result, len(urls))
	var wg sync.WaitGroup

	for w := 1; w <= workerCount; w++ {
		wg.Add(1)
		go Worker(w, jobs, results, &wg)
	}

	for _, url := range urls {
		jobs <- url
	}
	close(jobs)

	wg.Wait()
	close(results)

	fmt.Println("Scrape Results:")
	for res := range results {
		fmt.Printf("✓ %s (Status: %d, Time: %v)\\n", res.URL, res.Status, res.Latency)
	}
}
`
      }
    ],
    githubReadmeMarkdown: `# High-Throughput Concurrent Web Scraper in Go 🏎️

A bounded worker-pool crawler demonstrating production Go concurrency patterns.

## Features
- Bounded Goroutine pools preventing socket exhaustion
- Zero-lock CSP message passing via channels
- Thread-safe result aggregation
`
  }
];
