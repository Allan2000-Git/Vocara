export const data = [
    {
        "question": "Can you explain the difference between server-side rendering (SSR) and client-side rendering (CSR) in the context of Next.js?",
        "answer": "SSR renders the HTML on the server at request time, which is then sent to the client. This improves SEO and initial load performance. CSR, on the other hand, renders the content on the client side using JavaScript after the initial page load. Next.js allows developers to choose between SSR, CSR, and static site generation (SSG) based on the needs of the application."
    },
    {
        "question": "How do you manage state in a React application, and when would you use Redux Toolkit?",
        "answer": "State in a React application can be managed using useState and useReducer for local component state, and context API for global state. Redux Toolkit is used when the application has a more complex state management requirement, offering a structured approach to handle state updates, middleware, and dev tools integration. It is particularly useful for large-scale applications where state management can become intricate."
    },
    {
        "question": "Describe how you would optimize the performance of a React application.",
        "answer": "To optimize performance in a React application, you can use techniques such as code splitting with React.lazy and Suspense, memoizing components with React.memo, using useCallback and useMemo hooks to prevent unnecessary re-renders, and implementing virtualized lists with libraries like react-window. Additionally, optimizing assets like images, using efficient CSS, and minimizing bundle size can significantly improve performance."
    },
    {
        "question": "How do you ensure type safety in a React application using TypeScript?",
        "answer": "TypeScript ensures type safety by allowing developers to define types for props, state, and functions. By using TypeScript, you can catch type-related errors during development, leading to more robust and maintainable code. Additionally, using interfaces and type annotations, along with TypeScript's type inference, helps in understanding the structure of the code and prevents bugs related to type mismatches."
    },
    {
        "question": "Can you walk me through a challenging project you've worked on, focusing on the problem-solving approach and the technologies you used?",
        "answer": "In a recent project, I developed a complex dashboard using Next.js, React.js, and TypeScript. One of the challenges was to ensure real-time data updates and optimize the performance for large datasets. I implemented server-side rendering for initial data load and used WebSockets for real-time updates. To manage the state efficiently, I used Redux Toolkit. Additionally, I optimized the rendering of large lists using react-window. This approach ensured a smooth and responsive user experience while handling a significant amount of data."
    }
]