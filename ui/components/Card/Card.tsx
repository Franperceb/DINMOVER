interface Props {
  data: Property;
}
// TODO: anexar botones de eliminar y editar
function card({ data }: Props) {
  return (
    <div>
      <p>{data.title}</p>
    </div>
  );
}

export default card;

// style components soolo funciona con CSR
