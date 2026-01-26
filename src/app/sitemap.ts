import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://kermitfloor.com';
  const lastModified = new Date();

  return [
    {
      url: `${domain}/`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/`,
          tr: `${domain}/tr/`,
        },
      },
    },
    {
      url: `${domain}/resources`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/resources`,
          tr: `${domain}/tr/kaynaklar`,
        },
      },
    },
    {
      url: `${domain}/about`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/about`,
          tr: `${domain}/tr/hakkimizda`,
        },
      },
    },
    {
      url: `${domain}/contact`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/contact`,
          tr: `${domain}/tr/iletisim`,
        },
      },
    },
    {
      url: `${domain}/spc-wall-panels`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-wall-panels`,
          tr: `${domain}/tr/spc-duvar-panelleri`,
        },
      },
    },
    {
      url: `${domain}/spc-3d-wall-panels-model-a`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-3d-wall-panels-model-a`,
          tr: `${domain}/tr/spc-3d-duvar-panelleri-model-a`,
        },
      },
    },
    {
      url: `${domain}/spc-3d-wall-panels-model-b`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-3d-wall-panels-model-b`,
          tr: `${domain}/tr/spc-3d-duvar-panelleri-model-b`,
        },
      },
    },
    {
      url: `${domain}/spc-parquet-natural-collection`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-parquet-natural-collection`,
          tr: `${domain}/tr/spc-parke-natural-koleksiyonu`,
        },
      },
    },
    {
      url: `${domain}/spc-parquet-stone-collection`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-parquet-stone-collection`,
          tr: `${domain}/tr/spc-parke-tas-koleksiyonu`,
        },
      },
    },
    {
      url: `${domain}/full-natural-collection`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/full-natural-collection`,
          tr: `${domain}/tr/tam-dogal-koleksiyon`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/alpha-140-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/alpha-140-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/alpha-140-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/berlin-100-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/berlin-100-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/berlin-100-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/elite-100-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/elite-100-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/elite-100-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/moderna-100-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/moderna-100-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/moderna-100-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/optima-60-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/optima-60-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/optima-60-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/optima-90-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/optima-90-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/optima-90-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/solid-80-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/solid-80-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/solid-80-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/spc-skirting-boards/x-line-100-mm-skirting-board`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/spc-skirting-boards/x-line-100-mm-skirting-board`,
          tr: `${domain}/tr/spc-supurgelikler/x-line-100-mm-supurgelik`,
        },
      },
    },
    {
      url: `${domain}/privacy-policy`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/privacy-policy`,
          tr: `${domain}/tr/gizlilik-politikasi`,
        },
      },
    },
    {
      url: `${domain}/terms-of-service`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/terms-of-service`,
          tr: `${domain}/tr/kullanim-sartlari`,
        },
      },
    },
  ];
}
