function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Mini Social
          </h1>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;