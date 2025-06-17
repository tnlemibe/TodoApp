import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("Error caught in boundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-center max-w-xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
                    <p className="text-sm text-gray-500">{this.state.error?.message}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => window.location.reload()}
                    >
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
