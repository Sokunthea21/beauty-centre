interface CommentsBoxProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function CommentsBox({ value, onChange }: CommentsBoxProps) {
  return (
    <div className="mt-6">
      <label className="block mb-2 text-sm font-medium">Additional Comments</label>
      <textarea
        placeholder="Special instruction for seller…"
        className="w-full h-40 p-2 bg-white border border-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
