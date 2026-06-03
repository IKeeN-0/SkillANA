"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Template1 from '../resume-export/[id]/components/templates/template1';
import Template2 from '../resume-export/[id]/components/templates/template2';
import Template3 from '../resume-export/[id]/components/templates/template3';
import Template4 from '../resume-export/[id]/components/templates/template4';
import Template5 from '../resume-export/[id]/components/templates/template5';

// Extend the window interface for TypeScript
declare global {
  interface Window {
    isDataReady?: boolean;
  }
}

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
    console.log("ResumePdfPage mounted, checking searchParams...");
    const encoded = searchParams.get('data');
    const tId = searchParams.get('template');

    if (tId) setTemplateId(tId);

    if (encoded) {
      try {
        console.log("Decoding data...");
        // Correct way to decode UTF-8 base64 that was encodeURIComponent'ed
        const decodedStr = decodeURIComponent(window.atob(encoded));
        const decoded = JSON.parse(decodedStr);
        setData(decoded);
        console.log("Data set successfully");
        
        // Signal to Puppeteer that data is ready
        setTimeout(() => {
          window.isDataReady = true;
          console.log("isDataReady set to true");
        }, 1000); // 1 second buffer for rendering
      } catch (e: any) {
        console.error("Decode/Parse error:", e);
        // Still set ready but maybe show error on page so we can see it in screenshot/logs
        window.isDataReady = true; 
      }
    } else {
      console.warn("No 'data' parameter found in URL");
    }
  }, [searchParams]);

  if (!data) return <div>Loading Data for PDF... (Waiting for searchParams)</div>;

  const SelectedTemplate = templates[templateId] || Template4;

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <SelectedTemplate data={data} size="full" />
    </div>
  );
}