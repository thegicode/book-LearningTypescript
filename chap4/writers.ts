type Writers = {
    author: string | undefined;
    // Error :  'author' is declared here.
    editor?: string;
};

// Ok : author는 undefined으로 제공됨
const hasRequired: Writers = {
    author: undefined,
};

const missingRequired: Writers = {};
// Error :  Property 'author' is missing in type '{}' but required in type 'Writers'.
