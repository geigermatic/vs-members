# Supabase Member Data Viewer Project

## Domain Model
1. Core Entities:
   - Member (identified by uuid)
   - FinancialHealthStats (linked to Member by uuid)

2. Data Relationships:
   - One-to-many: Member -> FinancialHealthStats (monthly records)
   - Key field: uuid across both tables

## Environment Setup
```env
VITE_SUPABASE_URL=https://ehdqmnkyiaoqdyifaqma.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHFtbmt5aWFvcWR5aWZhcW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwOTk4MDMsImV4cCI6MjA1NTY3NTgwM30.k6N0PQqrvbQ0mJnjDynHaYPTXIfSdBxxeBCLSQGurbw
```

## Type Definitions
```typescript
// src/types/member.ts
export interface Member {
  uuid: string;
  member_name: string;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
  zipcode: string;
  gender: string;
  ethnicity: string;
  age: number;
  date_of_birth: string;
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  yearly_gross_income: number;
  inst_member_since: string;
  dashboard_status: string;
  inst_loan_advisor: string;
  last_profile_edit: string;
  phone_number: string;
}

// src/types/financialStats.ts
export interface FinancialHealthStats {
  id: string;
  uuid: string;
  member_name: string;
  month: string;
  verascore: number;
  verascore_health: string;
  factor_dti: number;
  dti_ratio: number;
  dti_health: string;
  factor_cash_on_hand: number;
  cash_lr_ratio: number;
  cash_lr_health: string;
  factor_spending: number;
  spending_cf_ratio: number;
  spending_cf_health: string;
  factor_savings: number;
  savings_s_ratio: number;
  savings_s_health: string;
  factor_debt: number;
  debt_ratio: number;
  debt_health: string;
  factor_payment_history: number;
  payment_crossing: number;
  payment_history_late_payment_factor: number;
  payment_history_health: string;
  gross_income: number;
  minimum_debt_payments: number;
  liquid_reserves: number;
  monthly_expenses: number;
  money_in: number;
  money_leftover: number;
  net_savings: number;
  total_outstanding_adverse_debt: number;
  actual_adverse_debt_payments: number;
  age_of_most_recent_late_payment: number;
  number_of_late_payments: number;
}
```

## API Endpoints
```typescript
// src/api/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL');
}
if (!import.meta.env.VITE_SUPABASE_KEY) {
  throw new Error('Missing VITE_SUPABASE_KEY');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// src/api/memberApi.ts
import { supabase } from './supabaseClient';
import type { Member, FinancialHealthStats } from '../types';

export const getMemberData = async (uuid: string): Promise<Member | null> => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('uuid', uuid)
    .single();

  if (error) throw error;
  return data;
};

export const getFinancialStats = async (uuid: string): Promise<FinancialHealthStats[]> => {
  const { data, error } = await supabase
    .from('financial_health_stats')
    .select('*')
    .eq('uuid', uuid)
    .order('month', { ascending: false });

  if (error) throw error;
  return data;
};
```

## Project Structure
```
/src
  /api
    supabaseClient.ts
    memberApi.ts
  /components
    MemberView.tsx
    FinancialStats.tsx
  /types
    index.ts
    member.ts
    financialStats.ts
  /utils
    formatters.ts
  App.tsx
  main.tsx
```

## Required Dependencies
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "typescript": "^5.x",
    "prettier": "^3.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x",
    "@types/node": "^20.x",
    "dotenv": "^16.x"
  }
}
```

## Testing Data
Example Member UUID for testing: "dc922ded-d0a7-415a-9d4c-f1e8605fce92"

## Implementation Requirements
1. Single page application - no routing
2. Display member details at top
3. Show financial stats below
4. Include loading states
5. Basic error handling
6. TypeScript strict mode
7. No mock data - use real Supabase connection

## Quick Start Implementation
```typescript
// src/App.tsx
import { useState, useEffect } from 'react';
import { getMemberData, getFinancialStats } from './api/memberApi';
import type { Member, FinancialHealthStats } from './types';

interface RequestMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  status: number;
  responseSize: number;
}

interface ApiMetrics {
  member: RequestMetrics;
  financial: RequestMetrics;
}

export default function App() {
  const [member, setMember] = useState<Member | null>(null);
  const [stats, setStats] = useState<FinancialHealthStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ApiMetrics | null>(null);

  const TEST_UUID = "dc922ded-d0a7-415a-9d4c-f1e8605fce92";
  const API_URL = import.meta.env.VITE_SUPABASE_URL;

  const HEADERS = {
    'apikey': import.meta.env.VITE_SUPABASE_KEY,
    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const memberStart = performance.now();
        const memberResponse = await getMemberData(TEST_UUID);
        const statsResponse = await getFinancialStats(TEST_UUID);
        const endTime = performance.now();
        
        // Calculate response sizes
        const memberSize = new Blob([JSON.stringify(memberResponse.data)]).size;
        const statsSize = new Blob([JSON.stringify(statsResponse.data)]).size;
        
        setMetrics({
          member: {
            startTime: memberStart,
            endTime,
            duration: endTime - memberStart,
            status: memberResponse.status,
            responseSize: memberSize
          },
          financial: {
            startTime: memberStart,
            endTime,
            duration: endTime - memberStart,
            status: statsResponse.status,
            responseSize: statsSize
          }
        });
        
        setMember(memberResponse.data);
        setStats(statsResponse.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!member) return <div>No member found</div>;

  const RequestDetails = ({ title }: { title: string }) => (
    <div style={{ 
      fontSize: '12px', 
      background: '#e9e9e9', 
      padding: '10px', 
      marginTop: '10px',
      borderRadius: '4px' 
    }}>
      <h4 style={{ margin: '0 0 8px 0' }}>Request Headers:</h4>
      <pre style={{ margin: 0 }}>{JSON.stringify(HEADERS, null, 2)}</pre>
      
      {metrics && (
        <div style={{ marginTop: '8px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Request Details:</h4>
          <p style={{ margin: '0 0 4px 0' }}>
            Status: {metrics[title === 'Member' ? 'member' : 'financial'].status}
          </p>
          <p style={{ margin: '0 0 4px 0' }}>
            Duration: {metrics[title === 'Member' ? 'member' : 'financial'].duration.toFixed(2)}ms
          </p>
          <p style={{ margin: 0 }}>
            Response Size: {(metrics[title === 'Member' ? 'member' : 'financial'].responseSize / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '1px solid #ccc' }}>API Explorer</h1>
      
      {/* Member API Call */}
      <div style={{ marginBottom: '40px' }}>
        <h2>1. Member API Call</h2>
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <strong>GET</strong> {`${API_URL}/rest/v1/members?uuid=eq.${TEST_UUID}`}
        </div>
        <RequestDetails title="Member" />
        
        <h3>Response:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          {JSON.stringify(member, null, 2)}
        </pre>
      </div>
      
      {/* Financial Stats API Call */}
      <div>
        <h2>2. Financial Stats API Call</h2>
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <strong>GET</strong> {`${API_URL}/rest/v1/financial_health_stats?uuid=eq.${TEST_UUID}`}
        </div>
        <RequestDetails title="Financial" />
        
        <h3>Response:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
          {JSON.stringify(stats, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>UUID: {TEST_UUID}</p>
        <p>API URL: {API_URL}</p>
        <p>Total Request Time: {metrics ? `${(metrics.member.duration).toFixed(2)}ms` : 'N/A'}</p>
      </div>
    </div>
  );
}
```

## Setup Steps
1. Create new project:
   ```bash
   npm create vite@latest jg-supabase-viewer -- --template react-ts
   cd jg-supabase-viewer
   ```

2. Install dependencies:
   ```bash
   npm install @supabase/supabase-js react react-dom typescript prettier
   npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react vite @types/node dotenv
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   # Add Supabase credentials
   ```

4. Copy types and API files as shown above

5. Start development:
   ```bash
   npm run dev
   ```

## Data Evolution Strategy
1. Database Schema Versioning:
   ```sql
   -- Example schema version tracking
   CREATE TABLE schema_versions (
     version_number INTEGER PRIMARY KEY,
     applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     description TEXT
   );
   ```

2. Type Definition Strategy:
   ```typescript
   // src/types/api.ts
   // Central type definition file for API responses
   export type ApiResponse<T> = {
     data: T;
     metadata?: {
       version: string;
       timestamp: string;
     };
   };

   // src/types/schema.ts
   // Schema version types
   export interface SchemaVersion {
     member: string;
     financial_stats: string;
     last_updated: string;
   }
   ```

3. API Version Management:
   ```typescript
   // src/api/config.ts
   export const API_VERSION = '1.0';
   
   // src/api/memberApi.ts
   export const getSchemaVersion = async (): Promise<SchemaVersion> => {
     const { data, error } = await supabase
       .from('schema_versions')
       .select('*')
       .order('version_number', { ascending: false })
       .limit(1)
       .single();
   
     if (error) throw error;
     return data;
   };
   ```

## Adding New Endpoints
1. Template for new endpoint:
   ```typescript
   // src/api/memberApi.ts
   export const newEndpoint = async (params: NewEndpointParams): Promise<NewEndpointResponse> => {
     // Validate schema version first
     const schemaVersion = await getSchemaVersion();
     if (schemaVersion.member !== API_VERSION) {
       console.warn(`API version mismatch. Expected ${API_VERSION}, got ${schemaVersion.member}`);
     }
   
     const { data, error } = await supabase
       .from('new_table')
       .select('*')
       // Add your query parameters
   
     if (error) throw error;
     return data;
   };
   ```

2. Type Extension Pattern:
   ```typescript
   // src/types/member.ts
   export interface MemberExtension {
     // Add new fields here
     new_field?: string;
   }
   
   export type EnhancedMember = Member & MemberExtension;
   ```

## Database Migration Strategy
1. Version Control:
   - Keep SQL migrations in `/db/migrations`
   - Name format: `YYYYMMDD_description.sql`
   - Track applied migrations in schema_versions table

2. Type Safety:
   - Update TypeScript types with each migration
   - Use optional fields for backward compatibility
   - Document breaking changes

3. Testing:
   - Test queries against new schema
   - Verify type compatibility
   - Check existing queries still work 

## Additional Setup Steps
0. Create project structure:
   ```bash
   mkdir -p src/{api,components,types,utils}
   touch src/api/{supabaseClient.ts,memberApi.ts}
   touch src/types/{member.ts,financialStats.ts,index.ts}
   touch src/App.tsx src/main.tsx
   ```

1. Create tsconfig.json:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "module": "ESNext",
       "skipLibCheck": true,
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true,
       "types": ["vite/client"]
     },
     "include": ["src"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   ```

1a. Create tsconfig.node.json:
   ```json
   {
     "compilerOptions": {
       "composite": true,
       "skipLibCheck": true,
       "module": "ESNext",
       "moduleResolution": "bundler",
       "allowSyntheticDefaultImports": true
     },
     "include": ["vite.config.ts"]
   }
   ```

1b. Create .env.example:
   ```env
   VITE_SUPABASE_URL=https://ehdqmnkyiaoqdyifaqma.supabase.co
   VITE_SUPABASE_KEY=your_key_here
   ```

1c. Create index.html:
   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Supabase Data Viewer</title>
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.tsx"></script>
     </body>
   </html>
   ```

1d. Create src/main.tsx:
   ```typescript
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import App from './App'

   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   )
   ```

## Complete Setup Commands
```bash
# 1. Create new project
npm create vite@latest jg-supabase-viewer -- --template react-ts
cd jg-supabase-viewer

# 2. Install dependencies
npm install @supabase/supabase-js react react-dom typescript prettier
npm install --save-dev @types/react @types/react-dom @vitejs/plugin-react vite @types/node dotenv

# 3. Create project structure
mkdir -p src/{api,components,types,utils}
touch src/api/{supabaseClient.ts,memberApi.ts}
touch src/types/{member.ts,financialStats.ts,index.ts}

# 4. Copy all template files
# - Copy App.tsx content to src/App.tsx
# - Copy type definitions to respective files
# - Copy API implementations to respective files
# - Copy configuration files to project root

# 5. Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 6. Start development server
npm run dev
```

## Verification Steps
1. Check that all files are present:
   ```bash
   ls -R src/
   ls *.{json,ts}
   ls .env*
   ```

2. Verify environment variables:
   ```typescript
   console.log('API URL:', import.meta.env.VITE_SUPABASE_URL);
   // Should not be undefined
   ```

3. Test API connection:
   ```bash
   curl -I $VITE_SUPABASE_URL
   # Should return 200 OK
   ``` 

## README.md Template
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
```

### Key Components
- `supabaseClient.ts`: Database connection management
- `memberApi.ts`: Data fetching logic
- `App.tsx`: Main display component

## Common Tasks

### 1. Query Examples

#### Get Latest Financial Stats
```sql
SELECT * FROM financial_health_stats
WHERE uuid = '[member_uuid]'
ORDER BY month DESC
LIMIT 1;
```

#### Find Members by Status
```sql
SELECT * FROM members
WHERE dashboard_status = 'Awaiting Dashboard';
```

#### Get Financial Trends
```sql
SELECT 
  month,
  verascore,
  dti_ratio,
  cash_lr_ratio
FROM financial_health_stats
WHERE uuid = '[member_uuid]'
ORDER BY month ASC
LIMIT 12;
```

### 2. Adding New Fields
1. Update Supabase schema
   ```sql
   ALTER TABLE members
   ADD COLUMN new_field VARCHAR(255);
   ```
2. Update TypeScript types in `src/types/member.ts`
3. Update API queries if needed
4. Update UI display

### 3. Common API Patterns
```typescript
// Fetch multiple records
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('field', value)
  .order('field', { ascending: false });

// Insert record
const { data, error } = await supabase
  .from('table_name')
  .insert([{ field: value }])
  .select();

// Update record
const { data, error } = await supabase
  .from('table_name')
  .update({ field: new_value })
  .eq('id', record_id)
  .select();
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check .env file configuration
   - Verify Supabase URL and key
   - Test connection: `curl -I $VITE_SUPABASE_URL`

2. **Type Errors**
   - Ensure types match Supabase schema
   - Check for null values in responses
   - Verify optional fields are marked with `?`

3. **Build Issues**
   - Clear node_modules: `rm -rf node_modules`
   - Clear cache: `npm cache clean --force`
   - Reinstall: `npm install`

### Debugging Tools

1. **Supabase Dashboard**
   - Check Database > Tables
   - Review API logs
   - Monitor realtime events

2. **Browser DevTools**
   - Network tab for API calls
   - Console for error messages
   - React DevTools for component state

## Maintenance

### Regular Tasks
1. Check for dependency updates
   ```bash
   npm outdated
   npm update
   ```

2. Monitor API performance
   - Review response times
   - Check error rates
   - Monitor data volumes

3. Type safety checks
   ```bash
   npm run typecheck
   ```

### Backup and Recovery
1. Export types:
   ```bash
   cp src/types/* /backup/types/
   ```

2. Backup environment:
   ```bash
   cp .env.* /backup/env/
   ```

## Development Workflow

### Adding Features
1. Update types if needed
2. Add/modify API endpoints
3. Update UI components
4. Test with real data
5. Document changes

### Code Style
- Use TypeScript strict mode
- Follow existing patterns
- Keep components focused
- Document complex logic

## Resources
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## Deployment

### Local Build Test
```bash
# Build the project locally first
npm run build

# Test the build
npm run preview
```

### Netlify Deployment
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Create netlify.toml:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. Set up environment variables in Netlify:
   - VITE_SUPABASE_URL: https://ehdqmnkyiaoqdyifaqma.supabase.co
   - VITE_SUPABASE_KEY: [your-key]

4. Deploy:
   ```bash
   # Test build locally
   netlify build

   # Deploy to preview
   netlify deploy

   # Deploy to production
   netlify deploy --prod
   ```

### Build Verification
1. Check environment variables are included
2. Verify API connections work
3. Test all data fetching
4. Confirm no CORS issues
``` 