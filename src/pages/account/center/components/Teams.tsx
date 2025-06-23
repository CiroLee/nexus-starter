import { useQuery } from '@tanstack/react-query';
import { getMembersById } from '@/_mock/member';
import { Card, CardBody, CardHeader, CardTitle } from '@ui/Card';
import { AvatarGroup, Avatar } from '@ui/Avatar';
import Show from '@ui/Show';
import { SkeletonText } from '@ui/Skeleton';

export default function Teams({ userId }: { userId: string }) {
  const { data: response, isPending } = useQuery({ queryKey: ['teams', userId], queryFn: () => getMembersById(userId) });
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isPending
        ? Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="relative h-32">
              <CardBody className="h-full space-y-2">
                <SkeletonText className="max-w-[80%]" />
                <SkeletonText />
              </CardBody>
            </Card>
          ))
        : response?.data.list.map((item) => (
            <Card key={item.id} className="bg-background">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-description mb-6 line-clamp-2 text-sm">{item.description}</p>
                <AvatarGroup>
                  {item.members.slice(0, 4).map((member) => (
                    <Avatar size="sm" bordered src={member.avatarUrl} fallback={member.username.slice(0, 1).toUpperCase()} key={member.id} />
                  ))}
                  <Show when={item.members.length > 4}>
                    <Avatar className="cursor-pointer" size="sm" bordered fallback={`+${item.members.length - 4}`} />
                  </Show>
                </AvatarGroup>
              </CardBody>
            </Card>
          ))}
    </div>
  );
}
