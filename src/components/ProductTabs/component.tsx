interface Props {
  usage: string;
  skinType: string;
  ingredients: string;
}

export default function ProductTabs({ usage, skinType, ingredients }: Props) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Recommended for:</h3>
          <p>{skinType}</p>
        </div>
        <div>
          <h3 className="font-semibold">How to use:</h3>
          <p>{usage}</p>
        </div>
        <div>
          <h3 className="font-semibold">Ingredients:</h3>
          <p className="text-sm text-gray-700">{ingredients}</p>
        </div>
      </div>
    </div>
  );
}
