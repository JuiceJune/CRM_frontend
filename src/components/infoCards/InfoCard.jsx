
export default function InfoCard(props) {
    // eslint-disable-next-line react/prop-types
    const {title, image, value, whole, className, vertical = false} = props;

    const cardContentClass = vertical ? 'info_card_content_vertical' : 'info_card_content_horizontal';

    return (
        <div className={`info_card_container ${className}`}>
            <div className='info_card_header'>
                {title}
            </div>
            <div className={`info_card_content ${cardContentClass}`}>
                <div className='info_card_image'>
                    <i className={`pi ${image}`} style={{ fontSize: '2.3rem' }}></i>
                </div>
                <div className='info_card_value'>
                    {whole ? `${((value / whole) * 100).toFixed(0)}% (${value})` : value}
                </div>
            </div>
        </div>
    )
}