import React from "react";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Məxfilik Siyasəti | Sparro",
  description: "Sparro məxfilik siyasəti və şəxsi məlumatların qorunması qaydaları.",
};

const PrivacyPolicyPage = () => {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Məxfilik Siyasəti</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Ümumi Müddəalar</h2>
            <p className={styles.paragraph}>
              Bu məxfilik siyasəti Sparro şirkətinin ("biz", "bizim", "şirkət") istifadəçilərin
              ("siz", "istifadəçi") fərdi məlumatlarını necə topladığını, istifadə etdiyini, qoruduğunu
              və paylaşdığını izah edir. Veb saytımızdan istifadə etməklə siz bu siyasət
              şərtləri ilə razılaşmış olursunuz.
            </p>
            <p className={styles.paragraph}>
              Biz fərdi məlumatların məxfiliyinə hörmətlə yanaşır və onları qüvvədə olan
              qanunvericiliyə uyğun olaraq qorumağı öhdəmizə götürürük.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Topladığımız Məlumatlar</h2>
            <p className={styles.paragraph}>
              Biz xidmətlərimizi təqdim etmək və təkmilləşdirmək üçün müxtəlif növ məlumatlar
              toplayırıq. Bunlara aşağıdakılar daxil ola bilər:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Şəxsi identifikasiya məlumatları:</strong> Ad, soyad, e-poçt ünvanı,
                telefon nömrəsi, çatdırılma ünvanı və s.
              </li>
              <li className={styles.listItem}>
                <strong>Ödəniş məlumatları:</strong> Satınalma zamanı istifadə edilən kredit
                kartı və ya digər ödəniş alətlərinin məlumatları (bu məlumatlar birbaşa olaraq
                təhlükəsiz ödəniş sistemləri tərəfindən işlənilir).
              </li>
              <li className={styles.listItem}>
                <strong>Texniki məlumatlar:</strong> IP ünvanı, brauzer növü, cihaz məlumatları,
                saytda keçirilən vaxt və ziyarət edilən səhifələr.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Məlumatların İstifadəsi</h2>
            <p className={styles.paragraph}>
              Topladığımız məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Sifarişlərin emalı və çatdırılması;</li>
              <li className={styles.listItem}>Müştəri xidmətlərinin göstərilməsi;</li>
              <li className={styles.listItem}>Veb saytımızın və xidmətlərimizin təkmilləşdirilməsi;</li>
              <li className={styles.listItem}>Müştəriləri yeni məhsullar, endirimlər və yeniliklər barədə məlumatlandırmaq (yalnız razılıq olduqda);</li>
              <li className={styles.listItem}>Dələduzluğun qarşısının alınması və təhlükəsizliyin təmin edilməsi.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Məlumatların Paylaşılması Və Açılması</h2>
            <p className={styles.paragraph}>
              Biz sizin fərdi məlumatlarınızı üçüncü şəxslərə satmırıq və icarəyə vermirik.
              Lakin məlumatlarınız aşağıdakı hallarda paylaşıla bilər:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Xidmət təminatçıları ilə:</strong> Çatdırılma şirkətləri, ödəniş
                sistemləri və IT dəstək xidmətləri.
              </li>
              <li className={styles.listItem}>
                <strong>Qanuni tələblər olduqda:</strong> Hüquq-mühafizə orqanlarının
                qanuni tələblərinə cavab vermək, qanunvericiliyə riayət etmək və hüquqlarımızı
                müdafiə etmək üçün.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Məlumatların Təhlükəsizliyi</h2>
            <p className={styles.paragraph}>
              Biz sizin fərdi məlumatlarınızı icazəsiz girişlərdən, itkildən və ya sui-istifadədən
              qorumaq üçün standart təhlükəsizlik tədbirləri görürük (SSL şifrələmə,
              təhlükəsiz serverlər, s.). Lakin nəzərə almaq lazımdır ki, internet
              üzərindən məlumatların ötürülməsi heç vaxt 100% təhlükəsiz hesab edilə bilməz.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Kukilər (Cookies)</h2>
            <p className={styles.paragraph}>
              Biz xidmət keyfiyyətini artırmaq və istifadəçi təcrübəsini fərdiləşdirmək üçün
              kukilərdən (cookies) istifadə edirik. Siz brauzerinizin parametrləri vasitəsilə
              kukiləri rədd edə bilərsiniz, lakin bu, saytımızın bəzi xüsusiyyətlərinin işləməsinə
              təsir göstərə bilər.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Uşaqların Məxfiliyi</h2>
            <p className={styles.paragraph}>
              Xidmətlərimiz 18 yaşından aşağı şəxslər üçün nəzərdə tutulmayıb. Biz bilərəkdən
              18 yaşdan kiçik uşaqlardan şəxsi məlumat toplamırıq. Əgər belə bir hal aşkar
              edilərsə, həmin məlumatlar dərhal silinəcəkdir.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Məxfilik Siyasətinə Dəyişikliklər</h2>
            <p className={styles.paragraph}>
              Biz bu məxfilik siyasətini vaxtaşırı yeniləyə bilərik. İstənilən dəyişiklik bu
              səhifədə dərc ediləcək və "Son yenilənmə tarixi" yenilənəcəkdir. Dəyişikliklərdən
              sonra saytdan istifadəyə davam etməyiniz, dəyişdirilmiş siyasəti qəbul etdiyiniz
              anlamına gəlir.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Əlaqə</h2>
            <p className={styles.paragraph}>
              Məxfilik siyasəti və ya şəxsi məlumatlarınızla bağlı hər hansı sualınız, irad və
              ya təklifiniz varsa, bizimlə əlaqə saxlaya bilərsiniz:
            </p>

            <div className={styles.contactInfo}>
              <p className={styles.contactTitle}>Sparro Müştəri Xidmətləri</p>
              <p className={styles.paragraph}><strong>E-poçt:</strong> info@sparro.az</p>
              <p className={styles.paragraph}><strong>Telefon:</strong> +994 50 000 00 00</p>
              <p className={styles.paragraph}><strong>Ünvan:</strong> Bakı şəhəri, Azərbaycan</p>
            </div>
          </section>

          <p className={styles.dateStamp}>
            Son yenilənmə tarixi: {new Date().toLocaleDateString('az-AZ')}
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
