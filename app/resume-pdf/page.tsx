"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Template1 from '../resume-export/[id]/components/templates/template1';
import Template2 from '../resume-export/[id]/components/templates/template2';
import Template3 from '../resume-export/[id]/components/templates/template3';
import Template4 from '../resume-export/[id]/components/templates/template4';
import Template5 from '../resume-export/[id]/components/templates/template5';

const templates: { [key: string]: React.ComponentType<any> } = {
  "1": Template1,
  "2": Template2,
  "3": Template3,
  "4": Template4,
  "5": Template5,
};

export default function ResumePdfPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [templateId, setTemplateId] = useState<string>("4");

  useEffect(() => {
    const encoded = searchParams.get('data');
    const tId = searchParams.get('template'); // ดึงค่า template จาก URL

    if (tId) setTemplateId(tId);

    if (encoded) {
      try {
        const decoded = JSON.parse(Buffer.from(encoded, 'base64').toString());
        setData(decoded);
      } catch (e) {
        console.error("Decode error", e);
      }
    }
  }, [searchParams]);

  if (!data) return <div>Loading Data for PDF...</div>;

  // เลือก Component ตาม ID ที่ส่งมา ถ้าหาไม่เจอให้ใช้ Template 4 เป็นตัวสำรอง
  const SelectedTemplate = templates[templateId] || Template4;

  return (
    <div style={{ backgroundColor: 'white' }}>
        <SelectedTemplate data={data} size="full" />
    </div>
  );
}