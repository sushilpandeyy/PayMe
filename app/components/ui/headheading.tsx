"use client";


function Headingdesig({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
      <div className="text-center my-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <h3 className="text-xl font-medium text-gray-600 mt-2">{subtitle}</h3>}
      </div>
    );
  }
export { Headingdesig };