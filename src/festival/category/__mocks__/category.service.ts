export const CategoryService = vi.fn().mockReturnValue({

  findAll: vi.fn().mockResolvedValue(
    [
      {
        id: 1,
        name: '19TH/20TH/21ST CENTURY SONATA',
        requiredComposer: null,
        description: null,
      },
      {
        id: 2,
        name: '20TH CENTURY COMPOSITIONS 1900-1970',
        requiredComposer: null,
        description: 'Selections composed in the years 1900-1970. Works by Late Romantic Composers must be entered in the Romantic class. Works by French composers must be entered in the French Composers class. Works by Canadian composers must be entered in the Canadian Composers class.',
      },
    ],
  ),
  findOne: vi.fn().mockResolvedValue(
    {
      id: 2,
      name: '20TH CENTURY COMPOSITIONS 1900-1970',
      requiredComposer: null,
      description: 'Selections composed in the years 1900-1970. Works by Late Romantic Composers must be entered in the Romantic class. Works by French composers must be entered in the French Composers class. Works by Canadian composers must be entered in the Canadian Composers class.',
    },
  ),
  create: vi.fn().mockResolvedValue(
    {
      userErrors: [],
      category: {
        name: 'Blues',
        requiredComposer: 'Eric Clapton',
        description: 'Popular music of the deep south.',
      },
    },
  ),
  update: vi.fn().mockResolvedValue(
    {
      userErrors: [],
      category: {
        name: 'Blues',
        requiredComposer: 'Eric Clapton',
        description: 'Popular music of the deep south.',
      },
    },
  ),
  remove: vi.fn().mockResolvedValue(
    {
      userErrors: [],
      category: {
        id: 2,
        name: 'Blues',
        requiredComposer: 'Eric Clapton',
        description: 'Popular music of the deep south.',
      },
    },
  ),
})
