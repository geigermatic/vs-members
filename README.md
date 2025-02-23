```markdown
# Supabase Data Viewer

A lightweight viewer for member and financial data from our Supabase database.

## Architecture

### Data Flow
```mermaid
graph LR
    A[Supabase DB] --> B[API Layer]
    B --> C[React Components]
    C --> D[UI Display]
