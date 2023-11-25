import arg from "arg";

let args = arg({
    // Types
    '--client': String, // --client <string> or --client=<string>
    // Aliases
    '-c': '--client', // -c <string>; result is stored in --client
});

if (!args['--client']) throw new Error('Missing required argument: --client');

export default args['--client'];