import {useSelector} from "react-redux";
import {isObject} from "chart.js/helpers";

const Summary = ({campaign}) => {
    const mailboxes = useSelector(state => state.campaigns.mailboxes);
    const prospectsCount = useSelector(state => state.prospects.prospects.length);
    const mailbox = !isObject(campaign.mailbox) ?
        mailboxes.find(mailbox => mailbox.id === +campaign.mailbox) :
        mailboxes.find(mailbox => mailbox.id === campaign.mailbox.id);

    return (
        <div>
            <div>Send from</div>
            <hr/>
            <b>{mailbox?.email ?? 'Empty'}</b>
            <br/>
            <br/>
            <br/>

            <div>Time</div>
            <hr/>

            <div className={'flex justify-content-between w-8'}>
                <div className={'flex flex-column gap-2'}>
                    {Object.keys(campaign.steps[0].sending_time_json).map((key) => (
                        <div key={key} className={'flex gap-4'}>
                            <div>
                                {key}
                            </div>
                            <div className={'flex justify-content-between gap-4'}>
                                {campaign.steps[0].sending_time_json[key][0] ? (
                                    <div className={'flex justify-content-between gap-4'}>
                                        <span>{campaign.steps[0].sending_time_json[key][1]}</span>
                                        <span> - </span>
                                        <span>{campaign.steps[0].sending_time_json[key][2]}</span>
                                    </div>
                                ) : (
                                    <div>
                                        -------------
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={'flex flex-column gap-2'}>
                    <div>
                        Timezone: <span><b>{campaign.timezone}</b></span>
                    </div>
                    <div>
                        Send limits <span><b>{campaign.send_limit}</b></span> mails per day
                    </div>
                </div>
            </div>
            <br/>

            <div>Steps</div>
            <hr/>
            <div className={'flex justify-content-between gap-4 w-8'}>
                <div>
                    Emails
                </div>
                <div>
                    Path: <b>{campaign.steps.length}</b> steps
                </div>
                <div>
                    A/B test: <b>No</b>
                </div>
            </div>
            <br/>

            <div>Prospects</div>
            <hr/>
            <div className={'w-8'}>
                This campaign includes <b>{prospectsCount}</b> prospects
            </div>
        </div>
    );
};

export default Summary;
