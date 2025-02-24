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

## Debug Layout Component

### Overview
A reusable debug layout component that helps visualize grid structures and component sections during development.

### Usage
1. Add the component to your project:
```tsx
import { DebugLayout, DebugSection } from './components/debug/DebugLayout';

const YourComponent = () => {
  return (
    <DebugLayout>
      <div className="grid grid-cols-3">
        <DebugSection 
          label="Left Section" 
          className="col-span-2"
        >
          {/* Your content */}
        </DebugSection>
        
        <DebugSection 
          label="Right Section" 
          className="col-span-1"
        >
          {/* More content */}
        </DebugSection>
      </div>
    </DebugLayout>
  );
};
```

2. Add required styles to your CSS:
```css
/* Debug styles */
.debug-layout {
  @apply outline outline-2 outline-red-500/50;
}

.debug-grid {
  @apply outline outline-2 outline-blue-500/50 relative;
}

.debug-cell {
  @apply outline outline-2 outline-green-500/50;
}

.debug-label {
  @apply absolute -top-3 left-0 text-xs text-red-500 font-mono bg-white px-1;
}
```

### Features
- Toggle debug mode with a floating button
- Visual outlines for layout sections
- Section labels
- Context-based state management
- Non-intrusive when disabled

### Extracting as a Standalone Package
To use this component across projects:

1. Create a new package:
```bash
mkdir debug-layout
cd debug-layout
npm init
```

2. Required files:
```
debug-layout/
├── src/
│   ├── DebugLayout.tsx     # Main component
│   ├── styles.css          # Debug styles
│   └── index.ts           # Exports
├── package.json
└── README.md
```

3. Dependencies:
```json
{
  "name": "@your-org/debug-layout",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

4. Usage in other projects:
```bash
npm install @your-org/debug-layout
```

```tsx
import { DebugLayout, DebugSection } from '@your-org/debug-layout';
import '@your-org/debug-layout/styles.css';
```

### Best Practices
- Only include in development builds
- Use meaningful section labels
- Keep debug sections aligned with logical component structure
- Remove debug sections before production deployment
