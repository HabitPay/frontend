"use client";

import Input from "@app/components/input";
import Layout from "@app/components/layout";
import TextArea from "@app/components/textarea";

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h3>챌린지 이름</h3>
          <input type="text" placeholder="책업일치" />
        </div>
        <div className="flex flex-col">
          <h3>챌린지 설명</h3>
          <TextArea />
        </div>
        <div className="flex flex-col">
          <h3>챌린지 기간</h3>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span>시작 일자</span>
              <input type="date" />
            </div>
            <div className="flex flex-col">
              <span>시작 일자</span>
              <input type="date" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            <div>챌린지 기간:29일</div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>벌금 설정</h3>
          <div>
            <span>벌금은 0원부터 설정 가능합니다.</span>
            <input type="number" />
            <div className="flex flex-row space-x-2">
              <div>+100원</div>
              <div>+1000원</div>
              <div>+10000원</div>
              <div>초기화</div>
            </div>
          </div>
        </div>
        <div>
          <h3>공동 벌금 계좌번호</h3>
          <span>벌금을 공동 계좌에 모으고 싶은 경우 입력하세요.</span>
          <div className="flex flex-row space-x-1">
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <span>챌린지 최대 참여 인원은 1000명입니다.</span>
        <button>챌린지 생성</button>
      </div>
    </Layout>
  );
};

export default Page;
