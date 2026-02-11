import React, { useState } from 'react';
import { createLibraryItem } from '../../../apis/library';
import type { CreateLibraryItemRequest } from '../../../types/library';

export const LibraryItemCreateTest: React.FC = () => {
    const [formData, setFormData] = useState<CreateLibraryItemRequest>({
        phrase: '',
        meaningKo: '',
        meaningEn: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string; itemId?: number } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            const response = await createLibraryItem(formData);
            setResult({
                success: true,
                message: `✅ 아이템이 성공적으로 생성되었습니다!`,
                itemId: response.id,
            });
            // Reset form
            setFormData({ phrase: '', meaningKo: '', meaningEn: '' });
        } catch (error) {
            setResult({
                success: false,
                message: `❌ 오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 예시 데이터로 채우기
    const fillExample = () => {
        setFormData({
            phrase: 'break the ice',
            meaningKo: '어색한 분위기를 깨다',
            meaningEn: 'to relieve tension',
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                📚 Library Item 생성 테스트
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Phrase (필수) */}
                <div>
                    <label htmlFor="phrase" className="block text-sm font-medium text-gray-700 mb-1">
                        표현 (Phrase) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="phrase"
                        name="phrase"
                        value={formData.phrase}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="예: break the ice"
                    />
                </div>

                {/* Meaning Ko (선택) */}
                <div>
                    <label htmlFor="meaningKo" className="block text-sm font-medium text-gray-700 mb-1">
                        의미 (한국어)
                    </label>
                    <input
                        type="text"
                        id="meaningKo"
                        name="meaningKo"
                        value={formData.meaningKo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="예: 어색한 분위기를 깨다"
                    />
                </div>

                {/* Meaning En (선택) */}
                <div>
                    <label htmlFor="meaningEn" className="block text-sm font-medium text-gray-700 mb-1">
                        의미 (영어)
                    </label>
                    <input
                        type="text"
                        id="meaningEn"
                        name="meaningEn"
                        value={formData.meaningEn}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="예: to relieve tension"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={fillExample}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        예시 데이터 채우기
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || !formData.phrase}
                        className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? '생성 중...' : '아이템 생성'}
                    </button>
                </div>
            </form>

            {/* Result Display */}
            {result && (
                <div
                    className={`mt-6 p-4 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                >
                    <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                        {result.message}
                    </p>
                    {result.itemId && (
                        <p className="mt-2 text-sm text-green-700">
                            생성된 아이템 ID: <span className="font-mono font-bold">{result.itemId}</span>
                        </p>
                    )}
                </div>
            )}

            {/* API Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📌 API 정보</h3>
                <div className="text-xs text-blue-800 space-y-1">
                    <p><strong>Endpoint:</strong> POST /api/library/items</p>
                    <p><strong>필수 필드:</strong> phrase</p>
                    <p><strong>선택 필드:</strong> meaningKo, meaningEn</p>
                    <p><strong>응답:</strong> {'{ id: number }'}</p>
                </div>
            </div>
        </div>
    );
};
