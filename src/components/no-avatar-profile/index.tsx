interface AvatarProfileProps {
  userName: string;
}

export function NoAvatarProfile({ userName }: AvatarProfileProps) {
  return (
    <div className="w-full h-full bg-primary flex items-center justify-center rounded-full">
      <h1 className="text-white font-bold">{userName[0]}</h1>
    </div>
  );
}
