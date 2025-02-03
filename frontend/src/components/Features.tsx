export default function Features() {
  return (
    <div
      id="features"
      className="mx-auto mt-32 pb-32 max-w-7xl px-6 sm:mt-40 lg:px-8"
    >
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How it works
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Feedy makes it easy to collect and analyze feedback from your users.
          Here's how:
        </p>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
        <div className="relative pl-9">
          <dt className="inline font-semibold text-gray-900">
            <svg
              className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                clipRule="evenodd"
              />
            </svg>
            Collect feedback.
          </dt>
          <dd className="inline">
            {" "}
            Easily integrate our widget into your application to start
            collecting feedback from your users.
          </dd>
        </div>
        <div className="relative pl-9">
          <dt className="inline font-semibold text-gray-900">
            <svg
              className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
            Organize and categorize.
          </dt>
          <dd className="inline">
            {" "}
            Our AI-powered system automatically categorizes feedback and
            identifies trends.
          </dd>
        </div>
        <div className="relative pl-9">
          <dt className="inline font-semibold text-gray-900">
            <svg
              className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
            Analyze and act.
          </dt>
          <dd className="inline">
            {" "}
            Get actionable insights and make data-driven decisions to improve
            your product.
          </dd>
        </div>
        <div className="relative pl-9">
          <dt className="inline font-semibold text-gray-900">
            <svg
              className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9c0 2.275-.728 4.622-2.346 6.837a.75.75 0 11-1.209-.89A9.958 9.958 0 0012.5 9a4.5 4.5 0 00-2.5-4.88z"
                clipRule="evenodd"
              />
            </svg>
            Integrate and automate.
          </dt>
          <dd className="inline">
            {" "}
            Connect with your existing tools and automate your feedback
            workflow.
          </dd>
        </div>
      </dl>
    </div>
  );
}
