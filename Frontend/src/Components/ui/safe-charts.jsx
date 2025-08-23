import React from 'react';

// This is a safe wrapper for Recharts components
// It prevents hook errors by catching and handling them gracefully
export function SafeResponsiveContainer({ children, width = "100%", height = 300, ...props }) {
  // Simple div fallback in case of errors
  return (
    <div
      style={{
        width: typeof width === 'string' ? width : `${width}px`,
        height: typeof height === 'string' ? height : `${height}px`,
        position: 'relative'
      }}
      className="recharts-responsive-container"
    >
      {/* Using try/catch to handle potential errors from Recharts */}
      {(() => {
        try {
          // Dynamically import recharts components only when needed
          const { ResponsiveContainer } = require('recharts');
          // Only render if the component is available
          if (typeof ResponsiveContainer === 'function') {
            return (
              <ResponsiveContainer width={width} height={height} {...props}>
                {children}
              </ResponsiveContainer>
            );
          }
          // Fallback content for the chart area
          return (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-md">
              <p className="text-gray-500">Chart visualization</p>
            </div>
          );
        } catch (error) {
          // Fallback content in case of errors
          return (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-md">
              <p className="text-gray-500">Chart visualization</p>
            </div>
          );
        }
      })()}
    </div>
  );
}

// Safe versions of common Recharts components
export function SafeBarChart(props) {
  try {
    const { BarChart } = require('recharts');
    return <BarChart {...props} />;
  } catch (error) {
    return <div className="h-full w-full bg-gray-100 rounded-md" />;
  }
}

export function SafeLineChart(props) {
  try {
    const { LineChart } = require('recharts');
    return <LineChart {...props} />;
  } catch (error) {
    return <div className="h-full w-full bg-gray-100 rounded-md" />;
  }
}

export function SafeAreaChart(props) {
  try {
    const { AreaChart } = require('recharts');
    return <AreaChart {...props} />;
  } catch (error) {
    return <div className="h-full w-full bg-gray-100 rounded-md" />;
  }
}

export function SafePieChart(props) {
  try {
    const { PieChart } = require('recharts');
    return <PieChart {...props} />;
  } catch (error) {
    return <div className="h-full w-full bg-gray-100 rounded-md" />;
  }
}

// Exporting other Recharts components that don't typically cause hook issues
export function getRechartsComponents() {
  try {
    return require('recharts');
  } catch (error) {
    return {};
  }
}
