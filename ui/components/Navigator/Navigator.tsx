import Link from "next/link";
import { Route } from "../../models/routes.models";

interface Props {
  pathNames: Route[];
}

export default function Navigator({ pathNames }: Props) {
  return (
    <div>
      {pathNames.map((pathName) => (
        <Link key={pathName.path} href={pathName.path}>
          {pathName.name}
        </Link>
      ))}
    </div>
  );
}
