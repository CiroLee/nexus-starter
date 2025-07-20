import { formatDate } from '@/utils/date';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import Link from '@ui/Link';
import { Timeline, TimelineIndicator, TimelineItem, TimelineContent, TimelineTitle } from '@ui/Timeline';
import MiniUser from '@/components/business/MiniUser';

export default function UpdateFeeds() {
  const { t } = useTranslation();
  return (
    <section className="panel">
      <Heading as="h5" className="mb-4">
        {t('common.updateFeeds')}
      </Heading>
      <div>
        <Timeline>
          <TimelineItem>
            <TimelineIndicator />
            <TimelineContent>
              <TimelineTitle>{formatDate('2025/1/23 10:45:12', { formatStr: 'yyyy/MM/dd HH:mm' })}</TimelineTitle>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <MiniUser username="John Doe" avatarUrl="https://nexus-avatars.netlify.app/assets/profile-15-CnUGI7xI.jpg" />
                add new <Tag>feature</Tag> to
                <Link href="https://github.com/CiroLee/nexus-kit" underline target="_blank">
                  nexus-kit
                </Link>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIndicator />
            <TimelineContent>
              <TimelineTitle>{formatDate('2025/1/22 14:05:12', { formatStr: 'yyyy/MM/dd HH:mm' })}</TimelineTitle>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <MiniUser username="Will Smith" avatarUrl="https://nexus-avatars.netlify.app/assets/profile-21-BuqmksxF.jpg" />
                approved a <Tag colors="secondary">PR</Tag> from
                <Link href="https://github.com/CiroLee/tiny-motion" underline target="_blank">
                  tiny-motion
                </Link>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineIndicator />
            <TimelineContent>
              <TimelineTitle>{formatDate('2025/1/02 9:15:42', { formatStr: 'yyyy/MM/dd HH:mm' })}</TimelineTitle>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <MiniUser username="Dan" avatarUrl="https://nexus-avatars.netlify.app/assets/profile-11-DyEkD0HJ.jpg" />
                created a new <Tag colors="neutral">repo</Tag>
                <Link href="https://github.com/CiroLee/tiny-lorem" underline target="_blank">
                  tiny-lorem
                </Link>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </section>
  );
}
