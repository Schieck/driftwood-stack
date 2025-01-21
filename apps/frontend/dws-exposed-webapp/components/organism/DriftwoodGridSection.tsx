import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { useTheme } from 'next-themes';
import {GridItem,  GridItemProps } from '@/components/atom/GridItem'; // Assuming you have a GridItem component

interface DriftwoodGridSectionProps {
    fetchData: (page: number) => Promise<GridItemProps[]>; // Mocking a fetchData function to simulate loading items.
}

/**
 * DriftwoodGridSection component displays a responsive grid with data.
 * @param {DriftwoodGridSectionProps} props - Component props.
 * @returns {React.ReactElement} - React component.
 */
const DriftwoodGridSection: React.FC<DriftwoodGridSectionProps> = ({ fetchData }) => {
    const [data, setData] = useState<GridItemProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { theme } = useTheme();

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetchData(currentPage)
            .then(newData => {
                setData(newData);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [fetchData, currentPage]);

    if (error) {
        return <div className="text-destructive">Error loading data.</div>; // Styling with Tailwind CSS
    }

    return (
        <div className="w-full grid-cols-4 items-center sm:-mt-36">
            <div
                className={`grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4
                    bg-muted
                    p-4 dark:bg-accent
                `}
            >
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-64" />
                    ))
                ) : (
                    data.map((item, index) => (
                        <GridItem key={index}><div> <p>Test</p></div></GridItem> 
                    ))
                )}
            </div>
            {!loading && (
                <Pagination                 
                />
            )}
        </div>
    );
};

export default DriftwoodGridSection;
