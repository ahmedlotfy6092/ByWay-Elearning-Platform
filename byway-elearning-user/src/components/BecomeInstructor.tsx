import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BecomeInstructor() {
  return (
    <>
      {/* Become an Instructor Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-200 to-purple-300 rounded-[3rem] overflow-hidden mx-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzU5OTE5NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl mb-4">Become an Instructor</h2>
              <p className="text-muted-foreground mb-6">
                Instructors from around the world teach millions of students on
                Byway. We provide the tools and skills to teach what you love.
              </p>
              <Button size="lg" className="px-8">
                Start Your Instructor Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-4">
                Transform your life through education
              </h2>
              <p className="text-muted-foreground mb-6">
                Learners around the world are launching new careers, advancing in
                their fields, and enriching their lives.
              </p>
              <Button size="lg"  className="px-8">
                Checkout Courses
              </Button>
            </div>

            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-[3rem] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625297670911-8311cd5e7832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0eXBpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzU5ODM0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Person using laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
