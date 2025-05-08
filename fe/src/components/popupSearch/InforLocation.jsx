import { useContext, useState, useEffect } from 'react'
import closeIcon from '~/assets/close.svg'
import saveIcon from '~/assets/save.svg'
import { GlobalContext } from '../../context/GlobalContext'
import Rating from '@mui/material/Rating'
import axios from 'axios'

function InforLocation({ item }) {
    const { setSelectedLocation } = useContext(GlobalContext)
    const [activeTab, setActiveTab] = useState('overview')
    const avatar_url = localStorage.getItem('avatar_url')
    const username = localStorage.getItem('username') || 'User'
    const token = localStorage.getItem('token')
    const [star, setStar] = useState(0)
    const [comment, setComment] = useState('')
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [reviews, setReviews] = useState([]) // State cho danh sách đánh giá

    // Lấy danh sách đánh giá khi tab "Bài đánh giá" được chọn
    useEffect(() => {
        if (activeTab === 'reviews') {
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/reviews?location_id=${item.location_id}`
                    )
                    setReviews(response.data)
                } catch (error) {
                    console.error('Lỗi khi lấy đánh giá:', error)
                }
            }
            fetchReviews()
        }
    }, [activeTab, item.location_id])

    const handleChangeStar = (e, newStar) => {
        setStar(newStar)
    }

    const handleImageChange = (e) => {
        const files = [...e.target.files]
        setImages(files)
        const previews = files.map((file) => URL.createObjectURL(file))
        setImagePreviews(previews)
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        if (!star) {
            alert('Vui lòng chọn số sao!')
            return
        }

        const formData = new FormData()
        formData.append('location_id', item.location_id)
        formData.append('rating', star)
        formData.append('comment', comment || '')
        images.forEach((image) => formData.append('images', image))

        try {
            await axios.post('http://localhost:5000/api/reviews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            })
            alert('Đánh giá đã được gửi!')
            // Reset form
            setStar(0)
            setComment('')
            setImages([])
            setImagePreviews([])
            // Làm mới danh sách đánh giá
            const response = await axios.get(
                `http://localhost:5000/api/reviews?location_id=${item.location_id}`
            )
            setReviews(response.data)
        } catch (error) {
            alert(
                'Có lỗi xảy ra: ' +
                    (error.response?.data?.error || 'Lỗi server')
            )
        }
    }

    const tabs = [
        { id: 'overview', label: 'Tổng quan' },
        { id: 'images', label: 'Hình ảnh' },
        { id: 'reviews', label: 'Bài đánh giá' },
    ]

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="p-4 max-h-[calc(100%-340px)]">
                        <div className="space-y-4">
                            <div>
                                <p className="font-medium text-sm text-gray-700">
                                    Địa chỉ:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.address ||
                                        'Chưa có thông tin địa chỉ.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-700">
                                    Giờ mở cửa:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.open_hours ||
                                        'Chưa có thông tin giờ mở cửa.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-700">
                                    Mô tả:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.description ||
                                        'Chưa có thông tin mô tả.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-700">
                                    Dịch vụ bổ sung:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.additional_services ||
                                        'Chưa có thông tin dịch vụ.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-gray-700">
                                    Đánh giá:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {item.average_rating} sao (
                                    {item.review_count} đánh giá)
                                </p>
                            </div>
                        </div>
                    </div>
                )
            case 'images':
                console.log('other_images:', item.other_images) // Debug
                const otherImages = item.other_images
                    ? item.other_images.split(', ').filter(Boolean)
                    : []
                const uniqueImages = [...new Set(otherImages)]
                return (
                    <div className="p-4 max-h-[calc(100%-340px)]">
                        {uniqueImages.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {uniqueImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Hình ảnh ${index + 1}`}
                                        className="w-full h-60 object-cover rounded-lg"
                                        onError={(e) =>
                                            (e.target.src =
                                                'https://via.placeholder.com/100')
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Chưa có hình ảnh.
                            </p>
                        )}
                    </div>
                )
            case 'reviews':
                return (
                    <div className="p-4 max-h-[calc(100%-340px)]">
                        <div className="">
                            <p className="font-medium text-sm mb-2">
                                Gửi đánh giá của bạn
                            </p>
                            <div className="space-y-3">
                                <span className="flex items-center gap-2">
                                    <img
                                        className="rounded-full w-[50px] h-[50px] object-cover"
                                        src={avatar_url}
                                        alt=""
                                    />
                                    <p className="font-semibold text-sm">
                                        {username}
                                    </p>
                                </span>
                                <input
                                    className="border-2 border-gray-200 cursor-pointer mb-2 p-1 w-full rounded-lg"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                        {imagePreviews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                )}
                                <Rating
                                    value={star}
                                    size="small"
                                    onChange={handleChangeStar}
                                    name="user-rating"
                                />
                                <textarea
                                    placeholder="Nhập đánh giá của bạn"
                                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    onClick={handleReviewSubmit}
                                    className="bg-gray-100 shadow-sm font-semibold text-black px-4 py-2 rounded-2xl text-sm hover:bg-gray-300 disabled:bg-gray-400"
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                        {reviews.length > 0 ? (
                            <div className="space-y-3 mt-4">
                                {reviews.map((review) => (
                                    <div
                                        key={review.review_id}
                                        className="border-b pb-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                className="rounded-full w-[40px] h-[40px] object-cover"
                                                src={review.avatar_url}
                                                alt=""
                                            />
                                            <p className="font-medium text-sm text-gray-700">
                                                {review.username}
                                            </p>
                                        </div>
                                        <Rating
                                            value={review.rating}
                                            readOnly
                                            size="small"
                                            sx={{
                                                '& .MuiRating-icon': {
                                                    fontSize: '0.8rem',
                                                },
                                            }}
                                        />
                                        <p className="text-sm text-gray-600">
                                            {review.comment ||
                                                'Không có bình luận'}
                                        </p>
                                        {review.image_urls?.length > 0 && (
                                            <div className="grid grid-cols-3 gap-2 mt-2">
                                                {review.image_urls.map(
                                                    (url, index) => (
                                                        <img
                                                            key={index}
                                                            src={`http://localhost:5000${url}`}
                                                            alt={`Review image ${index + 1}`}
                                                            className="w-full h-24 object-cover rounded-lg"
                                                            onError={(e) =>
                                                                (e.target.src =
                                                                    'https://via.placeholder.com/100')
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 mt-4">
                                Chưa có bài đánh giá.
                            </p>
                        )}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="fixed left-[33%] bg-white shadow-xl bottom-2 top-[15%] right-[38%] rounded-2xl scrollbar-hidden overflow-auto">
            <div className="w-full relative">
                <img
                    className="w-full h-[260px] object-cover rounded-t-2xl"
                    src={item.primary_image}
                    alt={item.name}
                />
                <div
                    onClick={() => setSelectedLocation(null)}
                    className="bg-white p-1.5 rounded-full absolute top-3 right-3 cursor-pointer shadow-md"
                >
                    <img className="w-5" src={closeIcon} alt="Đóng" />
                </div>
            </div>
            <div className="w-full p-4 flex justify-between items-center">
                <div>
                    <p className="font-bold text-2xl text-gray-800">
                        {item.name}
                    </p>
                    <span className="flex items-center gap-1 text-md font-semibold">
                        <p className="opacity-60">{item.average_rating}</p>
                        <Rating
                            name="simple-controlled"
                            value={item.average_rating}
                            readOnly
                            sx={{ '& .MuiRating-icon': { fontSize: '0.8rem' } }}
                        />
                        <p className="opacity-60">({item.review_count})</p>
                    </span>
                    <p className="font-medium text-sm text-gray-500">
                        {item.category_names.split(', ').join(' - ')}
                    </p>
                </div>
                <div>
                    <img
                        className="w-[25px] cursor-pointer"
                        src={saveIcon}
                        alt=""
                    />
                </div>
            </div>
            <div className="flex justify-between px-4 items-center border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-4 text-sm font-medium ${
                            activeTab === tab.id
                                ? 'text-green-600 border-b-2 border-green-600'
                                : 'text-gray-600 hover:text-green-600'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {renderContent()}
        </div>
    )
}

export default InforLocation
