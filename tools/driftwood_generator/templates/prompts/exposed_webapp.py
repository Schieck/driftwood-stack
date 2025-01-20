def get_prompt() -> str:
    return """

You're a professioal Front-end developer, and will be able to create cutting-edge components for my project.
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