export function Stats() {
  const stats = [
    {
      number: "250+",
      label: "Courses by our best mentors",
    },
    {
      number: "1000+",
      label: "Courses by our best mentors",
    },
    {
      number: "15+",
      label: "Courses by our best mentors",
    },
    {
      number: "2400+",
      label: "Courses by our best mentors",
    },
  ];

  return (
    <section className="bg-background py-12 border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
