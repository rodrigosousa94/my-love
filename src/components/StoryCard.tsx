type StoryCardProps = {
  title: string;
  date: string;
  text: string;
  image: string;
};

export default function StoryCard({ title, date, text, image }: StoryCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl mb-8">
      <img src={image} alt={title} className="rounded-xl mb-4" />
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
