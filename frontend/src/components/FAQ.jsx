const FAQ = () => {
  return (
    <section className="px-8 md:px-20 py-20 bg-white">
      <h3 className="text-3xl font-bold text-center mb-12 text-[#4e54c8]">
        Frequently Asked Questions
      </h3>
      <div className="max-w-3xl mx-auto space-y-6">
        <details className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer">
          <summary className="font-semibold text-lg">
            Is it free to use RentMate?
          </summary>
          <p className="text-gray-600 mt-2">
            Yes! Browsing and creating a profile is completely free. Premium
            features may be added in the future.
          </p>
        </details>
        <details className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer">
          <summary className="font-semibold text-lg">
            How do I connect with other roommates?
          </summary>
          <p className="text-gray-600 mt-2">
            You can connect with other people through our in-built chat.
          </p>
        </details>
        <details className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer">
          <summary className="font-semibold text-lg">
            Can I list my property as a tenant?
          </summary>
          <p className="text-gray-600 mt-2">
            Yes! Tenants can list their rooms or apartments directly and connect
            with other roommates.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
