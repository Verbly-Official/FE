import { CommentItem } from "../components/Comment/CommentItem";

const TestComment = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">


            {/* Others variant */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Others (default)</h2>
                <CommentItem
                    variant="others"
                    author="Mark"
                    time="30min"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                // avatarUrl 비워서 basicProfile.svg fallback 테스트
                />
            </section>

            {/* My variant */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">My</h2>
                <CommentItem
                    variant="my"
                    author="Mark"
                    time="30min"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                // avatarUrl 비워서 basicProfile.svg fallback 테스트
                />
            </section>

            {/* Sentence mode test */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Sentence mode (line-clamp-1)</h2>
                <CommentItem
                    variant="others"
                    author="Mark"
                    time="30min"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    sentence={true}
                />
            </section>

            {/* Long content test */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Long content (multi-line)</h2>
                <CommentItem
                    variant="my"
                    author="Mark"
                    time="30min"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                />
            </section>
        </div>
    );
};

export default TestComment;
