# basicVTT

Originally I thought this project would be easy because I saw the spec for VTT files and thought, "Hey, PLAINTEXT!"

To some degree, deconstructing Latin-based language text nodes, translating them, and reconstructing the translated nodes can be simple.

But:

1. Semantics. One can't assume that translation APIs will understand meaning across line breaks. I'm sure they can, but still. Ideally, this tool would be able to understand the concept of sentences so it can at least guarantee the semantics of each string if, say, each string is a coherent sentence. But there's no guarantee that an input .vtt will have proper punctuation, and it might have elements that don't convey semantic meaning but instead serve as enhancements of on-screen activity. Too much thought for a single self-taught dev.

2. Left to Right to Right to Left languages. It's one thing for me to parse a payload cue, however crudely. It's another thing entirely to reassemble the cues in reverse order.