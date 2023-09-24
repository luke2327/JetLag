import Button from '@/components/buttons/Button';
import Title from '@/components/Title';
import TransparentLayer from '@/components/TransparentLayer';

export default function HomePage() {
  return (
    <section>
      <div className='layout relative text-center sm:pt-4'>
        <Title title='Jet Lag Service'></Title>
        <TransparentLayer>
          <Button variant='outline'>수면시간 추천</Button>
        </TransparentLayer>
      </div>
    </section>
  );
}
