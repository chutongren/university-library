// 书的封面颜色、图片和尺寸（coverColor, coverImage，variant）
import { cn } from "@/lib/utils"; //动态生成css类名
import React from "react";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";
type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

//封面尺寸 映射到css类名。可维护性：如果需要修改某个尺寸的样式，只需修改映射表中的值，而不需要修改组件逻辑。
const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: BookCover) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        // variantStyles[variant],
        variantStyles[variant as keyof typeof variantStyles], // 类型断言，variant一定是有效值（extraSmall、small、medium、regular、wide之一）
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
