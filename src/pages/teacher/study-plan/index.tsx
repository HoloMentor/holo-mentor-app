import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import config from '@/config';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import { Tab, Tabs } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TierStudyPlan from './components/plan';

const tiers = [
    {
        id: 1,
        label: 'Tier 1'
    },
    {
        id: 2,
        label: 'Tier 2'
    },
    {
        id: 3,
        label: 'Tier 3'
    },
    {
        id: 4,
        label: 'Tier 4'
    },
    {
        id: 5,
        label: 'Tier 5'
    }
];

export default function StudyPlan() {
    const dispatch = useDispatch();
    const { classId } = useParams();

    return (
        <section className="flex flex-col gap-3">
            <Heading>Study Plans</Heading>

            <Content>
                <p>
                    Please download the sample CSV file by clicking on <b>Download Sample CSV</b>{' '}
                    and fill in the student marks. Once you’ve completed the file, upload it using
                    the <b>Upload Marks</b> button. Based on the grades, students will be
                    automatically sorted into different tiers, with Tier 1 for A-grade students,
                    Tier 2 for B-grade students, and so on.
                </p>
                <div className="flex gap-3 items-center">
                    <a href={`${config.api_url}study-plan/csv/${classId}`} download>
                        <Button
                            variant="bordered"
                            className="border-2 text-dark-green border-dark-green">
                            Download Sample CSV
                        </Button>
                    </a>

                    <Button
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_MARKS,
                                    props: { classId }
                                })
                            )
                        }>
                        Upload Marks
                    </Button>
                </div>
            </Content>

            <section className="my-5 mr-2">
                <div className="flex flex-col w-full">
                    <Tabs color="primary" variant="solid" items={tiers}>
                        {(item) => (
                            <Tab
                                key={item.id}
                                title={item.label}
                                className="py-5 font-semibold text-medium">
                                <TierStudyPlan tier={item.id} />
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </section>
        </section>
    );
}
