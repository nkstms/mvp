// components/admin/ClientProfile.js
import { CldImage } from 'next-cloudinary';

export default function ClientProfile({ client }) {
  return (
    <div>
      <h1>{client.name}</h1>
      <CldImage
        src={client.imageUrl} // Cloudinary public ID or URL
        width={500}
        height={500}
        alt={client.name}
        crop="fill"
      />
      <p>{client.bio}</p>
    </div>
  );
}