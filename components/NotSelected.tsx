import Image from 'next/image';

function NotSelected() {
  return (
    <Image
      src='/notFound.svg'
      alt='not_selected'
      width={400}
      height={200}
      style={{ marginTop: 'calc(50vh - 100px)' }}
    />
  );
}

export default NotSelected;
