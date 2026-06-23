export interface AboutProps {
  className?: string;
}
const About = ({ className }: AboutProps) => (
  <div className={className}>
    <h1 className="border-b border-b-gray-800">Privacy</h1>
    <h1 className="border-b border-b-gray-800">Built With</h1>
  </div>
);
export default About;
