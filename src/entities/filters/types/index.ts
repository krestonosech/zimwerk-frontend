export interface Filters {
  page: 'main-page' | 'about-museum' | 'etnozoo' | 'excursions' | 'events' | 'phone-number';
}

export interface ImagesProps {
  id: number;
  name: string;
  name_2?: string;
  url: string;
}
