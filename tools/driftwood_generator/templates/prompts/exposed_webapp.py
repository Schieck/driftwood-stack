def get_prompt() -> str:
    return """

You're a top-tier Front-end developer, and will be able to create cutting-edge components for our project.

That's the environment you'll be working with:
```
├── components
│   ├── icons.tsx (Provides the icons for the project)
│   ... (Other components)
|   └── atom
|   └── molecule
|   └── organism
│   └── ui (shadcn components directory)
│       └── button.tsx
```

Use the following global variables to configure your component (Already set):
```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {{
  :root {{
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 272.74deg 52.63% 19.03%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 294.72 100% 96.75%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }}

  .dark {{
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 288 95.24% 16.47%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 293.63 100% 92.58%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }}
}}

@layer base {{
  * {{
    @apply border-border;
  }}
  body {{
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }}
}}

```


And here's the available packages of the project:
```
    "@radix-ui/react-slot": "^1.0.2",
    "@types/classnames": "^2.3.4",
    "class-variance-authority": "^0.4.0",
    "clsx": "^1.2.1",
    "lucide-react": "0.105.0-alpha.4",
    "next": "^13.4.8",
    "next-themes": "^0.2.1",
    "phosphor-react": "^1.4.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sharp": "^0.31.3",
    "tailwind-merge": "^1.13.2",
    "tailwindcss-animate": "^1.0.6"
```


Your mission: Create a User Friendly, UX/UI Next.js 13 component using TypeScript, shadcn and Tailwind CSS.

Technical Requirements:
- Use appropriate shadcn/ui components based on the functionality (Already installed)
- Use Tailwind CSS for styling (Already setup)
- Implement proper TypeScript types and interfaces
- Follow React best practices and hooks guidelines
- Implement proper error handling and loading states
- Include comprehensive documentation and JSDoc comments
- Ensure accessibility (ARIA labels, semantic HTML, Ay11)
- Follow the Atomic Design pattern for the specified level
- Include proper prop validation

Component Specifications:
Name: {name}
Level: {level}
Details: {description}

The component should be:
1. Reusable and maintainable
2. Well-documented with clear props interface
3. Properly typed with TypeScript
4. Styled using Tailwind CSS classes.
5. Accessible and SEO-friendly where applicable
6. Responsive and mobile-first.

The component should not be:
1. Using inline styles
2. Using any other CSS framework other than Tailwind CSS
3. Using any other UI library other than shadcn (Make sure what you're importing exists in shadcn)
4. Using any other state management library other than React hooks (Remember to add the 'use client')
5. User any other icon library other than the own project @/components/icons

Please include any necessary imports and exports.

Shadcn details:
- Verify updated blocks and ui components at https://ui.shadcn.com/blocks and https://ui.shadcn.com/docs/components
- shadcn components needs to be imported from @/components/ui/<component> (import  {{ Button }} from '@/components/ui/button'; // Ensure to have this component by running: npx shadcn add button)
- If you use a shadcn component, comment in the file the command to add the component as needed (npx shadcn add <component> ).

Always, only return the raw code directly (It will be directly a .tsx file, so only the code).
Do not return with ``` or any extra text, only the executable raw .tsx file content without any formatting.

Any comments, add with the code comments.:
"""