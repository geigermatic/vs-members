   #!/bin/bash

   # Define project path
   PROJECT_PATH="/Users/jg/vs-projects/vs-api"

   # Create necessary directories
   mkdir -p "$PROJECT_PATH/.cursor-next/templates"

   # Copy template files
   cp /Users/jg/vs-projects/jg-lenders-main/.cursor-next/templates/supabase-viewer.md "$PROJECT_PATH/.cursor-next/templates/"
   cp /Users/jg/vs-projects/jg-lenders-main/.cursor-next/rules.txt "$PROJECT_PATH/.cursor-next/"

   # Create .gitignore
   echo ".env" > "$PROJECT_PATH/.gitignore"
   echo "node_modules" >> "$PROJECT_PATH/.gitignore"
   echo "dist" >> "$PROJECT_PATH/.gitignore"

   # Initialize git and make initial commit
   cd "$PROJECT_PATH"
   git init
   git add .cursor-next/
   git add .gitignore
   git commit -m "Initial commit: Project rules and templates"

   # Add remote and push to GitHub
   git remote add origin https://github.com/jgonis/vs-api.git
   git branch -M main
   git push -u origin main

   # Install project dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   echo "Please update the .env file with your Supabase credentials."

   # Start the development server
   npm run dev
   EOL

   # Make the script executable
   chmod +x /Users/jg/vs-projects/vs-api/scripts/setup.sh
