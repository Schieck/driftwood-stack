def get_prompt() -> str:
    return """Create a React Route component using TypeScript, shadcn and Tailwind CSS.

Technical Requirements:
- Implement React Router v6 best practices
- Use appropriate shadcn/ui components for the interface
- Include proper TypeScript types and interfaces
- Implement loading and error states
- Handle route parameters and navigation
- Include proper authentication checks where needed
- Follow the Atomic Design pattern for the specified level
- Include comprehensive documentation

Route Specifications:
Level: {level}
Details: {description}

The route component should:
1. Handle proper routing and navigation
2. Include proper error boundaries
3. Implement loading states
4. Handle authentication and authorization
5. Be properly typed with TypeScript
6. Use Tailwind CSS for styling

Please include all necessary imports and exports."""