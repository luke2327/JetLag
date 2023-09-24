export default function TransparentLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <fieldset className='transparent-layer'>{children}</fieldset>;
}
